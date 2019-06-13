import React from 'react';
import { LayoutAnimation, Alert } from 'react-native';
import { Icon } from 'native-base';
import signalr from 'react-native-signalr';
import Polyline from '@mapbox/polyline';

import Map from 'common/map';
import { formatLanguage } from 'common/language';

import { getDirection, getLocationAsync } from 'utils/map';

import { ARRAY_STEP, ARRAY_FIRST, ANIMATION_TIME, TWO } from 'constants/common-data';

import PointMarker from 'assets/images/point-marker.png';
import School from 'assets/images/school.png';
import Popup from './components/popup/popup.component';

const INTERVAL_TIME = 1500;
const FIXED_RATIO = 1.2;

const FOCUS_LATITUDE_DELTA = 0.009;
const FOCUS_LONGITUDE_DELTA = 0.016;

export default class RouteMap extends React.Component {
  static navigationOptions = () => ({
    tabBarLabel: formatLanguage('MAP'),
    tabBarIcon: ({ tintColor }) => <Icon ios='ios-map' android="md-map" style={{ color: tintColor }} />
  });

  constructor(props) {
    super(props);

    this.map = React.createRef();

    this.state = {
      vehicleCoordinate: null,
      markers: [],
      directions: [],
      chosenIndex: null
    };
  }

  componentDidMount() {
    this.watchDriverPosition();
    this.connectSignalr();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.vehicleCoordinate && this.state.vehicleCoordinate) {
      this.loadRoute();
    }
    if (this.props.screenProps.points !== prevProps.screenProps.points) {
      this.loadRoute();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.disconnectSignalr();
  }

  connectSignalr = () => {
    const { screenProps: { driverServiceID }, profile: { username } } = this.props;
    const connection = signalr.hubConnection('http://vinhngo.ddns.net/SchoolBus_CMS_DEV/signalr');

    this.proxy = connection.createHubProxy('trackingHub');

    this.proxy.on('onConnected', connectionID => {
      this.connectionID = connectionID;
    });

    connection.start().done(() => {
      this.proxy.invoke('connectTracking', username, driverServiceID);
    }).fail(err => console.log('Connect Failed ', err));
  }

  sendLocation = ({ latitude, longitude }) => {
    const { screenProps: { driverServiceID }, profile: { username } } = this.props;

    this.proxy && this.proxy.invoke(
      'sendLocation',
      username,
      JSON.stringify({ latitude, longitude }),
      driverServiceID
    );
  }

  sendDirection = directions => {
    const { screenProps: { driverServiceID }, profile: { username } } = this.props;

    let mergeDirection = [];

    directions.forEach(direction => {
      mergeDirection = [...mergeDirection, ...direction.map(point => [point.latitude, point.longitude])];
    });

    this.proxy && this.proxy.invoke(
      'sendDirection',
      username,
      Polyline.encode(mergeDirection),
      driverServiceID
    );
  }

  disconnectSignalr = () => {
    const { driverServiceID } = this.props.screenProps;

    this.proxy && this.proxy.invoke('disconnectTracking', this.connectionID, driverServiceID);
  }

  loadRoute = async () => {
    if (!this.state.vehicleCoordinate) return;

    const { points } = this.props.screenProps;

    const markers = points.map(point => ({
      coordinate: point.position,
      title: point.information.name,
      description: point.address,
      anchor: point.information.type === 'school' ? undefined : { x: 0.5, y: 0.5 },
      image: point.information.type === 'school' ? School : PointMarker,
      achieved: point.achieved
    }));

    const directions = await this.generateDirections(markers.filter(marker => !marker.achieved));

    this.sendDirection(directions);

    this.setState({ markers, directions });
    this.centerMap();
  }

  generateDirections = async markers => {
    const directions = [];

    const { vehicleCoordinate } = this.state;

    if (vehicleCoordinate && markers[ARRAY_FIRST]) {
      directions.push(await getDirection(vehicleCoordinate, markers[ARRAY_FIRST].coordinate));
    }

    for (let i = 0; i < markers.length - ARRAY_STEP; i++) {
      directions.push(await getDirection(markers[i].coordinate, markers[i + ARRAY_STEP].coordinate));
    }

    return directions;
  }

  watchDriverPosition = () => {
    this.interval = setInterval(async () => {
      if (this.props.screenProps.points.length) {
        const result = await getLocationAsync();

        if (result.errorMessage) {
          Alert.alert(
            formatLanguage('SCHOOL_DRIVE'),
            result.errorMessage,
            [{ text: 'OK', onPress: this.props.screenProps.handleBack }],
            { cancelable: false }
          );
          clearInterval(this.interval);
        } else {
          this.updateDriverPosition(result);
        }
      }
    }, INTERVAL_TIME);
  }

  updateDriverPosition = ({ coords: { latitude, longitude } }) => {
    this.sendLocation({ latitude, longitude });
    this.sendDirection(this.state.directions);

    if (this.map && this.map.current) {
      this.setState({ vehicleCoordinate: { latitude, longitude } });
      this.map.current.moveVehicle({ latitude, longitude });
    }
  }

  centerMap = () => {
    const points = this.props.screenProps.points.filter(point => !point.achieved);
    const { vehicleCoordinate } = this.state;

    const pointLats = points.map(point => point.position.latitude);
    const pointLngs = points.map(point => point.position.longitude);
    const vehicleLat = vehicleCoordinate.latitude;
    const vehicleLng = vehicleCoordinate.longitude;

    const maxLat = Math.max(...pointLats, vehicleLat);
    const minLat = Math.min(...pointLats, vehicleLat);
    const maxLng = Math.max(...pointLngs, vehicleLng);
    const minLng = Math.min(...pointLngs, vehicleLng);
    const latitude = (maxLat + minLat) / TWO;
    const longitude = (maxLng + minLng) / TWO;
    const latitudeDelta = ((maxLat - minLat) * FIXED_RATIO) || FOCUS_LATITUDE_DELTA;
    const longitudeDelta = ((maxLng - minLng) * FIXED_RATIO) || FOCUS_LONGITUDE_DELTA;

    this.map.current.moveMap({ latitude, longitude, latitudeDelta, longitudeDelta });
  }

  handleChooseMarker = index => {
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: ANIMATION_TIME });
    this.setState({ chosenIndex: index });
  }

  handleReleaseMarker = () => {
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: ANIMATION_TIME });
    this.setState({ chosenIndex: null });
  }

  render() {
    const { markers, directions, chosenIndex } = this.state;
    const {
      handleNotify,
      handleChild,
      handleArriveSchool,
      handleFinish,
      points,
      isGoingToSchool
    } = this.props.screenProps;
    const finished = points.filter(point => !point.achieved).length ? undefined : true;

    return (
      <React.Fragment>
        <Map
          ref={this.map}
          markers={markers}
          directions={directions}
          handleChooseVehicle={this.handleReleaseMarker}
          handleChooseMarker={this.handleChooseMarker}
          handleChooseMap={this.handleReleaseMarker}
        />
        <Popup
          finished={finished}
          item={(chosenIndex === null) ? null : points[chosenIndex]}
          index={chosenIndex}
          isGoingToSchool={isGoingToSchool}
          handleNotify={handleNotify}
          handleChild={handleChild}
          handleArriveSchool={handleArriveSchool}
          handleFinish={handleFinish}
        />
      </React.Fragment>
    );
  }
}
