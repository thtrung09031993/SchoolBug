import React from 'react';
import signalr from 'react-native-signalr';
import Polyline from '@mapbox/polyline';

import Map from 'common/map';

import { ARRAY_FIRST, ARRAY_SECOND } from 'constants/common-data';
import { formatLanguage } from 'common/language';

export default class SchoolDrive extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('SCHOOL_DRIVE')
  });

  constructor(props) {
    super(props);

    this.map = React.createRef();

    this.state = {
      vehicleCoordinate: null,
      markers: []
    };
  }

  componentDidMount() {
    this.connectSignalr();
  }

  componentWillUnmount() {
    this.disconnectSignalr();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.vehicleCoordinate && this.state.vehicleCoordinate) {
      this.map.current.moveMap(this.state.vehicleCoordinate);
    }
  }

  connectSignalr = () => {
    const { username } = this.props.profile;
    const driverServiceID = this.props.navigation.getParam('driverServiceID', null);
    const connection = signalr.hubConnection('http://vinhngo.ddns.net/SchoolBus_CMS_DEV/signalr');

    this.proxy = connection.createHubProxy('trackingHub');

    this.proxy.on('onConnected', connectionID => {
      this.connectionID = connectionID;
    });

    this.proxy.on('updateLocation', (driverUsername, location) => {
      this.updateDriverPosition(JSON.parse(location));
    });

    this.proxy.on('updateDirection', (driverUsername, encodedDirection) => {
      this.updateDriverDirection(encodedDirection);
    });

    connection.start().done(() => {
      this.proxy.invoke('connectTracking', username, driverServiceID);
    }).fail(err => console.log('Start Failed', err));
  }

  disconnectSignalr = () => {
    const driverServiceID = this.props.navigation.getParam('driverServiceID', null);

    this.proxy && this.proxy.invoke('disconnectTracking', this.connectionID, driverServiceID);
  }

  updateDriverPosition = ({ latitude, longitude }) => {
    this.setState({ vehicleCoordinate: { latitude, longitude } });

    if (this.map && this.map.current) {
      this.map.current.moveVehicle({ latitude, longitude });
    }
  }

  updateDriverDirection = encodedDirection => {
    const points = Polyline.decode(encodedDirection);
    const coords = points.map(point => ({
      latitude: point[ARRAY_FIRST],
      longitude: point[ARRAY_SECOND]
    }));

    this.setState({ directions: [coords] });
  }

  render() {
    const { markers, directions } = this.state;

    return (
      <Map
        ref={this.map}
        markers={markers}
        directions={directions}
      />
    );
  }
}
