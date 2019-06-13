import React from 'react';
import {
  Button,
  Content,
  Toast,
  View,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';

import Language, { formatLanguage } from 'common/language';
import WeekdaysChoosing from 'common/weekdays-choosing';
import DatePicker from 'common/date-picker';
import TimePicker from 'common/time-picker';
import PlaceSuggetion from 'common/place-autocomplete';
import ChildrenPicker from 'common/children-picker';
import NoChildrenHandler from './components/no-children-handler';
import { styles } from './service-requirement.style';
import { initTime, initDate, validateRequirement } from './service-requirement.util';
import geocode from 'common/geocode-api';
import API from 'common/api';

import { HOME } from 'constants/screen';
import { REQUIREMENTS, CHOOSE_SERVICE, REQUIREMENT_DETAIL } from 'customer/constants/screen';

import { ARRAY_EMPTY, ARRAY_FIRST, ARRAY_STEP, DECIMAL, CURRENCY, POPULAR_SCHOOL_DAYS, RESPONSE_ERROR } from 'constants/common-data';
import {
  ADDRESS, SCHOOL, CHILDREN,
  REQUIREMENT_API,
  CHILD_API, REQUIREMENT, TRIP_FEE_API
} from 'constants/api';
import { countDates } from 'utils/time';
import { formatCurrency } from 'utils/currency';

export default class ServiceRequirement extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params && navigation.state.params.requirement
        ?
        formatLanguage('UPDATE_REQUIREMENT')
        :
        formatLanguage('CREATE_REQUIREMENT')
    };
  }

  constructor(props) {
    super(props);
    const requirement = this.props.navigation.getParam('requirement', null);

    this.state = {
      childrenList: [],
      weekdays: requirement ? requirement[REQUIREMENT.DAYS_OF_WEEK].split(',') : POPULAR_SCHOOL_DAYS,
      pickUpTime: requirement ? new Date(requirement[REQUIREMENT.PICK_UP_TIME]) : new Date(),
      arrivalTime: requirement ? new Date(requirement[REQUIREMENT.ARRIVAL_TIME]) : new Date(),
      returnTime: requirement ? new Date(requirement[REQUIREMENT.RETURN_TIME]) : new Date(),
      pickUpAddress: requirement ? requirement[REQUIREMENT.PICK_UP_ADDRESS][ADDRESS.DETAIL] : props.profile.address,
      school: requirement
        ? `${requirement[SCHOOL.SCHOOL][SCHOOL.NAME]}, ${requirement[SCHOOL.SCHOOL][ADDRESS.ADDRESS][ADDRESS.DETAIL]}`
        : '',
      startDate: requirement ? new Date(requirement[REQUIREMENT.START_DATE]) : new Date(),
      endDate: requirement ? new Date(requirement[REQUIREMENT.END_DATE]) : new Date(),
      chosenChildren: requirement
        ?
        requirement[CHILDREN.CHILDREN].map(child => { return child[CHILDREN.CHILD_ID]; })
        :
        [],
      pickUpAddressCoordinate: null,
      schoolCoordinate: null,
      unitPrice: 0
    };
  }

  componentDidMount() {
    const { pickUpAddress, school } = this.state;
    const { navigation } = this.props;
    const requirement = navigation.getParam('requirement', null);

    if (pickUpAddress) {
      this.handleAddress('pickUpAddress', 'pickUpAddressCoordinate', pickUpAddress);
    }

    if (school) {
      this.handleAddress('school', 'schoolCoordinate', school);
    }

    requirement
      ? null
      :
      Alert.alert(
        formatLanguage('CUSTOMER_SHIFT_TITLE'),
        formatLanguage('CUSTOMER_SHIFT_QUESTION'),
        [
          { text: formatLanguage('MORNING'), onPress: () => this.setState({ ...initTime('morning'), ...initDate() }) },
          { text: formatLanguage('AFTERNOON'), onPress: () => this.setState({ ...initTime('afternoon'), ...initDate() }) }
        ],
        { cancelable: true },
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { pickUpAddressCoordinate, schoolCoordinate } = this.state;

    if (
      pickUpAddressCoordinate &&
      schoolCoordinate &&
      (
        prevState.pickUpAddressCoordinate !== pickUpAddressCoordinate ||
        prevState.schoolCoordinate !== schoolCoordinate
      )
    ) {
      API.get(TRIP_FEE_API, {
        [ADDRESS.ORIGIN_LATITUDE]: pickUpAddressCoordinate[ADDRESS.LATITUDE],
        [ADDRESS.ORIGIN_LONGITUDE]: pickUpAddressCoordinate[ADDRESS.LONGITUDE],
        [ADDRESS.DESTINATION_LATITUDE]: schoolCoordinate[ADDRESS.LATITUDE],
        [ADDRESS.DESTINATION_LONGITUDE]: schoolCoordinate[ADDRESS.LONGITUDE]
      }).then(res => {
        this.setState({ unitPrice: res.fee });
      }).catch(err => {
        Toast.show({
          text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: err.status ? 'danger' : 'warning'
        });
      });
    }
  }

  handleChooseChildren = childIDList => {
    let newState = null;

    if (childIDList.length) {
      const lastChildID = childIDList[childIDList.length - ARRAY_STEP];
      const child = this.state.childrenList.find(childItem => childItem[CHILDREN.CHILD_ID] === lastChildID);

      const school = `${child[SCHOOL.SCHOOL][SCHOOL.NAME]}, ${child[SCHOOL.SCHOOL][ADDRESS.ADDRESS][ADDRESS.DETAIL]}`;

      this.handleAddress('school', 'schoolCoordinate', school);

      newState = { chosenChildren: childIDList, school };
    } else {
      newState = { chosenChildren: childIDList };
    }

    this.setState(newState);
  }

  handleFields = (field, value) => { this.setState({ [field]: value }); }

  handleAddress = async (field, coordinateField, value) => {
    if (this.state[field] === value && this.state[coordinateField]) return;

    const geocodeResult = await geocode(value);

    this.setState({
      [field]: value,
      [coordinateField]: {
        [ADDRESS.DETAIL]: value,
        [ADDRESS.LATITUDE]: geocodeResult.geometry.location.lat,
        [ADDRESS.LONGITUDE]: geocodeResult.geometry.location.lng
      }
    });
  }

  handleSubmit = () => {
    const requirement = this.state;

    if (validateRequirement(requirement)) {
      this.submitForm();
    }
  }

  submitForm = async () => {
    try {
      let newRequirement = this.state;
      const { navigation } = this.props;
      const schoolName = this.state.school.split(',')[ARRAY_FIRST];

      let data = {
        [REQUIREMENT.DAYS_OF_WEEK]: newRequirement.weekdays.sort(),
        [REQUIREMENT.PICK_UP_TIME]: newRequirement.pickUpTime,
        [REQUIREMENT.ARRIVAL_TIME]: newRequirement.arrivalTime,
        [REQUIREMENT.RETURN_TIME]: newRequirement.returnTime,
        [REQUIREMENT.PICK_UP_ADDRESS]: newRequirement.pickUpAddressCoordinate,
        [SCHOOL.SCHOOL]: {
          [SCHOOL.NAME]: schoolName,
          [ADDRESS.ADDRESS]: newRequirement.schoolCoordinate
        },
        [REQUIREMENT.START_DATE]: newRequirement.startDate,
        [REQUIREMENT.END_DATE]: newRequirement.endDate,
        [CHILDREN.CHILDREN]: newRequirement.chosenChildren
      };
      const requirement = navigation.getParam('requirement', null);

      let response = {};

      if (requirement) {
        response = await API.put(
          `${REQUIREMENT_API}?${REQUIREMENT.CUSTOMER_REQUIREMENT_ID}=${requirement[REQUIREMENT.CUSTOMER_REQUIREMENT_ID]}`,
          data
        );
      } else {
        response = await API.post(REQUIREMENT_API, data);
      }
      const customerRequirementID = response[REQUIREMENT.CUSTOMER_REQUIREMENT_ID];

      Toast.show({
        text: formatLanguage(requirement ? 'UPDATE_REQUIREMENT_SUCCESSFULLY' : 'CREATE_REQUIREMENT_SUCCESSFULLY'),
        type: 'success',
        buttonText: 'OK'
      });

      const resetAction = StackActions.reset({
        index: 3,
        actions: [
          NavigationActions.navigate({ routeName: HOME }),
          NavigationActions.navigate({ routeName: REQUIREMENTS }),
          NavigationActions.navigate({ routeName: REQUIREMENT_DETAIL, params: { customerRequirementID } }),
          NavigationActions.navigate({
            routeName: CHOOSE_SERVICE,
            params: {
              customerRequirementID,
              startAddress: newRequirement.pickUpAddress,
              school: newRequirement.school,
              startDate: newRequirement.startDate,
              endDate: newRequirement.endDate,
              weekdays: newRequirement.weekdays,
              numberOfChildren: newRequirement.chosenChildren.length
            }
          })
        ]
      });

      navigation.dispatch(resetAction);
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'EXISTED_REQUIREMENT')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  getChildren = async () => {
    try {
      let childrenList = await API.get(CHILD_API);

      childrenList = Array.isArray(childrenList) ? childrenList : [];
      this.setState({
        childrenList
      });
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_CHILDREN')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status && error.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { unitPrice, startDate, endDate, weekdays, chosenChildren } = this.state;

    const today = new Date();
    const numberOfDates = countDates(
      startDate > today ? startDate : today,
      endDate,
      weekdays.map(day => parseInt(day, DECIMAL))
    );
    const totalPrice = unitPrice * numberOfDates * chosenChildren.length;

    return (
      <Content>
        <NavigationEvents onDidFocus={this.getChildren} />

        <View>
          {this.state.childrenList.length === ARRAY_EMPTY ?
            <NoChildrenHandler />
            :
            <ChildrenPicker title="CHOOSE_CHILDREN" childrenList={this.state.childrenList}
              chosenChildren={this.state.chosenChildren}
              handleChosenChildren={this.handleChooseChildren} />
          }
        </View>

        <View style={{ marginTop: 20 }}>
          <Language style={styles.daysOfWeekTitle}>PICKING_DAYS</Language>
          <WeekdaysChoosing updateDays={value => this.handleFields('weekdays', value)}
            chosenDays={this.state.weekdays} />
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>PICKUP_TIME</Language>
          </View>
          <View style={styles.rightCol}>
            <TimePicker updateTime={value => this.handleFields('pickUpTime', value)}
              time={this.state.pickUpTime} />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>ARRIVAL_TIME</Language>
          </View>
          <View style={styles.rightCol}>
            <TimePicker updateTime={value => this.handleFields('arrivalTime', value)}
              time={this.state.arrivalTime} />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>RETURN_TIME</Language>
          </View>
          <View style={styles.rightCol}>
            <TimePicker updateTime={value => this.handleFields('returnTime', value)}
              time={this.state.returnTime} />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>START_DATE</Language>
          </View>
          <View style={styles.rightCol}>
            <DatePicker updateDate={value => this.handleFields('startDate', value)}
              date={this.state.startDate} />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>END_DATE</Language>
          </View>
          <View style={styles.rightCol}>
            <DatePicker updateDate={value => this.handleFields('endDate', value)}
              date={this.state.endDate} />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>PICKUP_ADDRESS</Language>
          </View>
          <View style={styles.rightCol}>
            <PlaceSuggetion
              updatePlace={value =>
                this.handleAddress('pickUpAddress', 'pickUpAddressCoordinate', value)
              }
              place={this.state.pickUpAddress}
            />
          </View>
        </View>

        <View style={styles.registerItem}>
          <View style={styles.leftCol}>
            <Language>SCHOOL</Language>
          </View>
          <View style={styles.rightCol}>
            <PlaceSuggetion
              updatePlace={value =>
                this.handleAddress('school', 'schoolCoordinate', value)
              }
              place={this.state.school}
            />
          </View>
        </View>

        <View style={styles.information}>
          <View style={styles.price}>
            <Language style={styles.priceText}>UNIT_PRICE ({CURRENCY}/PERSON/DAY)</Language>
            <Text style={styles.priceText}>{formatCurrency(unitPrice)}</Text>
          </View>
          <View style={styles.price}>
            <Language style={styles.priceText}>TOTAL_PRICE</Language>
            <Text style={styles.priceText}>{formatCurrency(totalPrice)}</Text>
          </View>
        </View>

        <Button style={styles.button} onPress={this.handleSubmit}>
          <Language>
            {
              navigation.state.params && navigation.state.params.requirement
                ?
                'UPDATE_REQUIREMENT'
                :
                'CREATE_REQUIREMENT'
            }
          </Language>
        </Button>
      </Content>

    );
  }
}
