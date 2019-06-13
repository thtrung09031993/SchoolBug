import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Toast } from 'native-base';

import { formatLanguage } from 'common/language';
import API from 'common/api';

import { DRIVER_GET_ALL_TRIP, CUSTOMER_GET_ALL_TRIP } from 'constants/api';

import Trip from './components/trip';

import { parseTripsAPI } from './history.util';

import { textStyles, styles } from './history.style';
import { TRIP_STATUS } from 'constants/status';
import { SCHOOL_DRIVE, ORDER_DETAIL } from 'constants/screen';
import { RESPONSE_ERROR } from 'constants/common-data';

export default class History extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('HISTORY')
  });

  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      loaded: false,
      message: ''
    };

    this.page = 0;
  }

  componentDidMount() {
    const { appType } = this.props.screenProps;
    const apiUrl = appType === 'driver' ? DRIVER_GET_ALL_TRIP : CUSTOMER_GET_ALL_TRIP;

    API.get(apiUrl, { page: this.page, startTime: '', endTime: '' }).then(res => {
      this.setState({ trips: parseTripsAPI(res), loaded: true });
    }).catch(err => {
      this.setState({ message: err.Message });
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          err.status
            ?
            (err.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_HISTORY')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status && err.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    });
  }

  handleChooseTrip = (id, status) => {
    const { push } = this.props.navigation;

    if (status === TRIP_STATUS.GOING) {
      push(SCHOOL_DRIVE, { 'driverServiceID': id });
    } else {
      push(ORDER_DETAIL, { 'dailyTripID': id });
    }
  }

  render() {
    const { trips, loaded, message } = this.state;

    return (
      <ScrollView style={styles.container}>
        {loaded
          ? trips.map((trip, index) =>
            <Trip
              key={index}
              {...trip}
              handleChooseTrip={this.handleChooseTrip}
            />)
          : <Text style={textStyles.message}>{message}</Text>
        }
      </ScrollView>
    );
  }
}
