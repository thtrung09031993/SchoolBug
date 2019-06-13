import React from 'react';
import { ScrollView, View } from 'react-native';
import { Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import Language, { formatLanguage } from 'common/language';
import API from 'common/api';
import geocode from 'common/geocode-api';
import Cover from 'common/cover';

import {
  REQUIREMENT,
  FIND_MATCHING_SERVICE_API,
  FIND_MATCHING_TEMP_SERVICE_API,
  CONTRACT_AGREEMENT_API,
  TRIP_FEE_API,
  ADDRESS,
  SERVICE,
  DAILY_TRIP,
  TEMP_CONTRACT_API
} from 'constants/api';
import { DECIMAL, RESPONSE_ERROR } from 'constants/common-data';

import { countDates } from 'utils/time';

import DriveService from './components/driver-service';

import { parseDriverServiceListAPI } from './choose-service.util';
import { styles, textStyles } from './choose-service.style';
import { formatCurrency } from 'utils/currency';

export default class ChooseService extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: formatLanguage(params.offDay ? 'CHOOSE_ALTERNATIVE_SERVICE' : 'CHOOSE_SERVICE')
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      driverServices: [],
      isLoaded: false,
      unitPrice: 0,
      totalPrice: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const offDay = navigation.getParam('offDay', null);

    if (!offDay) {
      this.calculatePrices();
    }
  }

  calculatePrices = async () => {
    const startAddress = this.props.navigation.getParam('startAddress', null);
    const school = this.props.navigation.getParam('school', null);
    const startDate = this.props.navigation.getParam('startDate', null);
    const endDate = this.props.navigation.getParam('endDate', null);
    const weekdays = this.props.navigation.getParam('weekdays', null);
    const numberOfChildren = this.props.navigation.getParam('numberOfChildren', null);

    const startAddressGeocode = await geocode(startAddress);
    const schoolGeocode = await geocode(school);

    const tripFeeRes = await API.get(TRIP_FEE_API, {
      [ADDRESS.ORIGIN_LATITUDE]: startAddressGeocode.geometry.location.lat,
      [ADDRESS.ORIGIN_LONGITUDE]: startAddressGeocode.geometry.location.lng,
      [ADDRESS.DESTINATION_LATITUDE]: schoolGeocode.geometry.location.lat,
      [ADDRESS.DESTINATION_LONGITUDE]: schoolGeocode.geometry.location.lng
    });

    const today = new Date();
    const numberOfDates = countDates(
      startDate > today ? startDate : today,
      endDate,
      weekdays.map(day => parseInt(day, DECIMAL))
    );

    const unitPrice = tripFeeRes.fee;
    const totalPrice = unitPrice * numberOfDates * numberOfChildren;

    this.setState({ unitPrice, totalPrice });
  }

  getDriverServiceList = () => {
    const { navigation } = this.props;
    const customerRequirementID = navigation.getParam('customerRequirementID', null);
    const driverServiceID = navigation.getParam('driverServiceID', null);
    const offDay = navigation.getParam('offDay', null);

    if (customerRequirementID) {
      const apiLink = offDay ? FIND_MATCHING_TEMP_SERVICE_API : FIND_MATCHING_SERVICE_API;

      let param = {
        [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: customerRequirementID
      };

      param = offDay && driverServiceID
        ? {
          ...param,
          ...{
            [SERVICE.DRIVER_SERVICE_ID]: driverServiceID,
            [DAILY_TRIP.OFF_DATE]: offDay
          }
        } : param;

      API.get(apiLink, param)
        .then(res => this.setState({ driverServices: parseDriverServiceListAPI(res), isLoaded: true }))
        .catch(error => {
          this.setState({ driverServices: [], isLoaded: true });
          Toast.show({
            text: formatLanguage(
              // eslint-disable-next-line no-nested-ternary
              error.status
                ?
                (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_MATCHING')
                :
                'NETWORK_ERROR'),
            buttonText: 'OK',
            type: error.status && error.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
          });
        });
    }
  }

  handleChooseService = async driverServiceID => {
    const { navigation } = this.props;
    const customerRequirementID = navigation.getParam('customerRequirementID', null);
    const offDay = navigation.getParam('offDay', null);
    const apiLink = offDay ? TEMP_CONTRACT_API : CONTRACT_AGREEMENT_API;

    let param = {
      [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: customerRequirementID,
      [SERVICE.DRIVER_SERVICE_ID]: driverServiceID
    };

    param = offDay
      ? {
        ...param,
        ...{
          [DAILY_TRIP.OFF_DATE]: offDay
        }
      }
      : param;

    API.post(apiLink, param)
      .then(() => {
        Toast.show({
          text: formatLanguage(offDay ? 'CHOOSE_ALTERNATIVE_SUCCESSFULLY' : 'CHOOSE_SERVICE_SUCCESSFULLY'),
          type: 'success',
          buttonText: 'OK'
        });
        navigation.goBack();
      })
      .catch(err => {
        Toast.show({
          text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: err.status ? 'danger' : 'warning'
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const { driverServices, isLoaded, unitPrice, totalPrice } = this.state;
    const offDay = navigation.getParam('offDay', null);

    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          <NavigationEvents onDidFocus={this.getDriverServiceList} />
          {
            offDay
              ? null
              :
              <View style={styles.price}>
                <Language style={textStyles.price}>
                  UNIT_PRICE: {formatCurrency(unitPrice)}/PERSON/DAY
                </Language>
                <Language style={textStyles.price}>
                  TOTAL_PRICE: {formatCurrency(totalPrice)}
                </Language>
              </View>
          }

          {isLoaded && !driverServices.length
            ? <Language style={textStyles.message}>NO_DRIVER</Language>
            : null
          }

          {isLoaded
            ? driverServices.map((driverService, index) =>
              <DriveService offDay={offDay}
                handleChooseService={this.handleChooseService} key={index} {...driverService} />)
            : null
          }
        </ScrollView>

        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}
