import React from 'react';
import {
  Button,
  Content,
  Toast,
  Input,
  View
} from 'native-base';
import { KeyboardAvoidingView, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Language, { formatLanguage } from 'common/language';
import WeekdaysChoosing from 'common/weekdays-choosing';
import TimePicker from 'common/time-picker';
import geocode from 'common/geocode-api';
import API from 'common/api';

import { HOME } from 'constants/screen';
import { SERVICES, SERVICE_DETAIL } from 'driver/constants/screen';
import PlaceSuggetion from 'common/place-autocomplete';

import { ARRAY_FIRST, DECIMAL, ZERO, POPULAR_SCHOOL_DAYS, RESPONSE_ERROR } from 'constants/common-data';
import {
  SERVICE, ADDRESS, SCHOOL, CHILDREN,
  SERVICE_API
} from 'constants/api';
import { styles } from './service-opening.style';
import { validateService, initTime } from './service-opening.util';

export default class ServiceOpening extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params && navigation.state.params.service
        ?
        formatLanguage('UPDATE_SERVICE')
        :
        formatLanguage('OPEN_SERVICE')
    };
  }

  constructor(props) {
    super(props);
    const service = props.navigation.getParam('service', null);
    const { car } = props;

    this.state = {
      weekdays: service ? service[SERVICE.DAYS_OF_WEEK].split(',') : POPULAR_SCHOOL_DAYS,
      startTime: service ? new Date(service[SERVICE.START_TIME]) : new Date(),
      arrivalTime: service ? new Date(service[SERVICE.ARRIVAL_TIME]) : new Date(),
      returnTime: service ? new Date(service[SERVICE.RETURN_TIME]) : new Date(),
      startAddress: service ? service[SERVICE.START_ADDRESS] : props.profile.address,
      school: service
        ? `${service[SCHOOL.SCHOOL][SCHOOL.NAME]}, ${service[SCHOOL.SCHOOL][ADDRESS.ADDRESS][ADDRESS.DETAIL]}`
        : '',
      className: service ? service[SERVICE.CLASS_NAME] : '',
      capacity: service ? `${service[SERVICE.CAPACITY_AVAILABLE]}` : car.capacity
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const service = navigation.getParam('service', null);

    service
      ? null
      :
      Alert.alert(
        formatLanguage('DRIVER_SHIFT_TITLE'),
        formatLanguage('DRIVER_SHIFT_QUESTION'),
        [
          { text: formatLanguage('MORNING'), onPress: () => this.setState(initTime('morning')) },
          { text: formatLanguage('AFTERNOON'), onPress: () => this.setState(initTime('afternoon')) }
        ],
        { cancelable: true },
      );
  }

  handleFields = (field, value) => { this.setState({ [field]: value }); };

  handleSubmit = () => {
    const service = this.state;
    const { car } = this.props;

    if (validateService(service, car)) {
      this.submitForm();
    }
  }

  submitForm = async () => {
    try {
      let newService = this.state;
      const { navigation } = this.props;
      const startAddressGeocodeResult = await geocode(this.state.startAddress);
      const schoolGeocodeResult = await geocode(this.state.school);
      const schoolName = this.state.school.split(',')[ARRAY_FIRST];

      let data = {
        [SERVICE.DAYS_OF_WEEK]: newService.weekdays.sort(),
        [SERVICE.START_TIME]: newService.startTime,
        [SERVICE.ARRIVAL_TIME]: newService.arrivalTime,
        [SERVICE.RETURN_TIME]: newService.returnTime,
        [SERVICE.START_ADDRESS]: {
          [ADDRESS.DETAIL]: startAddressGeocodeResult.formatted_address,
          [ADDRESS.LATITUDE]: startAddressGeocodeResult.geometry.location.lat,
          [ADDRESS.LONGITUDE]: startAddressGeocodeResult.geometry.location.lng
        },
        [SCHOOL.SCHOOL]: {
          [SCHOOL.NAME]: schoolName,
          [ADDRESS.ADDRESS]: {
            [ADDRESS.DETAIL]: schoolGeocodeResult.formatted_address,
            [ADDRESS.LATITUDE]: schoolGeocodeResult.geometry.location.lat,
            [ADDRESS.LONGITUDE]: schoolGeocodeResult.geometry.location.lng
          }
        },
        [CHILDREN.CLASS_NAME]: newService.className,
        [SERVICE.CAPACITY_AVAILABLE]: newService.capacity
      };
      const service = navigation.getParam('service', null);

      let driverServiceID = '';

      let response = {};

      if (service) {
        response = await API.put(
          `${SERVICE_API}?${SERVICE.DRIVER_SERVICE_ID}=${service[SERVICE.DRIVER_SERVICE_ID]}`,
          data
        );
      } else {
        response = await API.post(SERVICE_API, data);
      }
      driverServiceID = response[SERVICE.DRIVER_SERVICE_ID];

      Toast.show({
        text: formatLanguage(service ? 'UPDATE_SERVICE_SUCCESSFULLY' : 'CREATE_SERVICE_SUCCESSFULLY'),
        type: 'success',
        buttonText: 'OK'
      });

      const resetAction = StackActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: HOME }),
          NavigationActions.navigate({ routeName: SERVICES }),
          NavigationActions.navigate({ routeName: SERVICE_DETAIL, params: { driverServiceID } })
        ]
      });

      navigation.dispatch(resetAction);
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'EXISTED_SERVICE')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Content>
        <KeyboardAvoidingView behavior="position">
          <View style={{ marginTop: 20 }}>
            <Language style={styles.daysOfWeekTitle}>DRIVING_DAYS</Language>
            <WeekdaysChoosing updateDays={weekdays => this.handleFields('weekdays', weekdays)}
              chosenDays={this.state.weekdays} />
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>START_TIME</Language>
            </View>
            <View style={styles.rightCol}>
              <TimePicker updateTime={startTime => this.handleFields('startTime', startTime)}
                time={this.state.startTime} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>ARRIVAL_TIME</Language>
            </View>
            <View style={styles.rightCol}>
              <TimePicker updateTime={arrivalTime => this.handleFields('arrivalTime', arrivalTime)}
                time={this.state.arrivalTime} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>RETURN_TIME</Language>
            </View>
            <View style={styles.rightCol}>
              <TimePicker updateTime={returnTime => this.handleFields('returnTime', returnTime)}
                time={this.state.returnTime} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>START_ADDRESS</Language>
            </View>
            <View style={styles.rightCol}>
              <PlaceSuggetion updatePlace={startAddress => this.handleFields('startAddress', startAddress)}
                place={this.state.startAddress} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>SCHOOL</Language>
            </View>
            <View style={styles.rightCol}>
              <PlaceSuggetion updatePlace={school => this.handleFields('school', school)}
                place={this.state.school} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>CLASS</Language>
            </View>
            <View style={styles.rightCol}>
              <Input
                value={this.state.className}
                onChangeText={className => this.handleFields('className', className)} />
            </View>
          </View>

          <View style={styles.registerItem}>
            <View style={styles.leftCol}>
              <Language>CAPACITY</Language>
            </View>
            <View style={styles.rightCol}>
              <Input keyboardType="number-pad" value={`${this.state.capacity}`}
                onChangeText={capacity =>
                  this.handleFields('capacity', capacity ? parseInt(capacity, DECIMAL) : ZERO)
                }
              />
            </View>
          </View>

          <Button style={styles.button} onPress={this.handleSubmit}>
            <Language>
              {
                navigation.state.params && navigation.state.params.service
                  ?
                  'UPDATE_SERVICE'
                  :
                  'OPEN_SERVICE'
              }
            </Language>
          </Button>
        </KeyboardAvoidingView>
      </Content>
    );
  }
}
