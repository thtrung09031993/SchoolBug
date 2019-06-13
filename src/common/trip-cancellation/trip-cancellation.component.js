import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Content, View, Textarea, Picker, Button, Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import Language, { formatLanguage } from 'common/language';
import DatePicker from 'common/date-picker';
import { getNextDay } from 'common/datetime-formatter';
import ChildrenPicker from 'common/children-picker';
import {
  DAILY_TRIP, CHILDREN, CONTRACT, SERVICE,
  CUSTOMER_CANCELLATION_REQUEST_API,
  DRIVER_CANCELLATION_REQUEST_API
} from 'constants/api';
import API from 'common/api';
import { styles } from './trip-cancellation.style';
import {
  OFF_REASON, ARRAY_FIRST, ARRAY_STEP, ARRAY_EMPTY,
  EMPTY_STRING, DAYS_OF_WEEK_SHORT, LAST_DAY, FIRST_DAY, NEXT_DATE
} from 'constants/common-data';

export default class TripCancellation extends React.Component {

  static navigationOptions = () => ({
    title: formatLanguage('TRIP_CANCELLATION')
  })

  constructor(props) {
    super(props);

    this.state = {
      children: this.props.screenProps.appType === 'driver' ? undefined : [],
      chosenChildren: [],
      offDate: new Date(),
      description: ARRAY_FIRST,
      otherReason: {
        isVisible: false,
        content: ''
      }
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const days = navigation.getParam('schoolDays', []);

    let offDate = new Date();

    let day = offDate.getDay();

    while (!days.includes(day.toString())) {
      day = day === LAST_DAY ? FIRST_DAY : day + NEXT_DATE;
      offDate = getNextDay(offDate);
    }
    this.setState({ offDate });
  }

  handleFields = (field, value) => this.setState({ [field]: value });

  handleOffDate = offDate => {
    const { screenProps: { appType } } = this.props;
    const schoolDays = this.props.navigation.getParam('schoolDays', []);

    schoolDays.includes(new Date(offDate).getDay().toString())
      ?
      this.handleFields('offDate', offDate)
      :
      Toast.show({
        text: `${formatLanguage(
          appType === 'driver'
            ?
            'DRIVER_WRONG_SERVICE_DAYS'
            :
            'WRONG_SERVICE_DAYS')}${formatLanguage(DAYS_OF_WEEK_SHORT[offDate.getDay()])}`,
        buttonText: 'OK',
        type: 'warning'
      });
  }

  handlePicker = value => {
    value === OFF_REASON.length - ARRAY_STEP
      ?
      this.setState({ description: value, otherReason: { isVisible: true, content: '' } })
      :
      this.setState({ description: value, otherReason: { isVisible: false, content: '' } });
  }

  handleAnotherReason = reason => {
    this.setState(prevState => ({
      otherReason: {
        isVisible: prevState.otherReason.isVisible,
        content: reason
      }
    }));
  }

  getInfo = async () => {
    const { navigation, screenProps: { appType } } = this.props;

    this.setState({
      children: appType === 'driver' ? undefined : navigation.getParam('children', []),
      contract: appType === 'driver' ? undefined : navigation.getParam('contractID', null),
      driverServiceID: appType === 'driver' ? navigation.getParam('driverServiceID', null) : undefined
    });
  }

  isValidated = offRequest => {
    if (offRequest.children) {
      if (offRequest.chosenChildren.length === ARRAY_EMPTY ||
        offRequest.offDate === '') {
        return false;
      }

      return true;
    }
    if (offRequest.offDate === '') {
      return false;
    }

    if (offRequest.otherReason.isVisible && offRequest.otherReason.content.length === EMPTY_STRING) {
      return false;
    }

    return true;
  }

  handleSendRequest = async () => {
    try {
      const offRequest = this.state;
      const { navigation, screenProps: { appType } } = this.props;

      if (!this.isValidated(offRequest)) {
        Toast.show({
          text: formatLanguage('FIELDS_WARNING'),
          buttonText: 'OK',
          type: 'warning'
        });

        return;
      }

      const data = {
        [CONTRACT.CONTRACT_ID]: appType === 'driver' ? undefined : navigation.getParam('contractID', ''),
        [SERVICE.DRIVER_SERVICE_ID]: appType === 'driver' ? navigation.getParam('driverServiceID', '') : undefined,
        [CHILDREN.CHILDREN]: appType === 'driver' ? undefined : offRequest.chosenChildren,
        [DAILY_TRIP.OFF_DATE]: offRequest.offDate,
        [DAILY_TRIP.DESCRIPTION]:
          offRequest.description === OFF_REASON.length - ARRAY_STEP
            ?
            offRequest.otherReason.content
            :
            formatLanguage(OFF_REASON[offRequest.description])
      };

      const apiLink = appType === 'driver'
        ?
        DRIVER_CANCELLATION_REQUEST_API
        :
        CUSTOMER_CANCELLATION_REQUEST_API;

      await API.post(apiLink, data);

      Toast.show({
        text: formatLanguage('REQUEST_RECORDED'),
        buttonText: 'OK',
        type: 'success'
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { screenProps: { appType } } = this.props;

    return (
      <Content contentContainerStyle={styles.container}>
        <NavigationEvents onDidFocus={this.getInfo} />
        <KeyboardAvoidingView behavior="position">

          {
            appType === 'driver'
              ?
              <View></View>
              :
              <ChildrenPicker title="CHILDREN_OFF" childrenList={this.state.children}
                chosenChildren={this.state.chosenChildren}
                handleChosenChildren={chosenChildren => this.handleFields('chosenChildren', chosenChildren)} />
          }
          <View style={styles.dayoff}>
            <Language style={styles.title}>
              {
                appType === 'driver'
                  ?
                  'CHOOSE_DRIVER_DAY_OFF'
                  :
                  'CHOOSE_DAY_OFF'
              }
            </Language>
            <View style={styles.dayoffPicker}>
              <View style={{ flex: 1 }}></View>
              <View style={{ flex: 3 }}>
                <DatePicker weekday date={this.state.offDate}
                  updateDate={date => this.handleOffDate(date)}
                  minimumDate={new Date()} />
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
          </View>

          <View style={styles.reason}>
            <View style={styles.reasonTitle}>
              <Language style={styles.title}>
                {
                  appType === 'driver'
                    ?
                    'DRIVER_OFF_REASON'
                    :
                    'OFF_REASON'
                }
              </Language>
            </View>
            <View style={styles.reasonPicker}>
              <Picker style={styles.picker} note mode="dropdown" selectedValue={this.state.description}
                onValueChange={reason => this.handlePicker(reason)}
              >
                {
                  OFF_REASON.map((reason, index) => {
                    return (
                      <Picker.Item key={index} label={formatLanguage(reason)} value={index} />
                    );
                  })
                }
              </Picker>
            </View>
          </View>
          <Textarea placeholderTextColor='lightgrey'
            placeholder={appType === 'driver'
              ?
              formatLanguage('DRIVER_REASON')
              :
              formatLanguage('CHILD_REASON')
            }
            rowSpan={5} bordered style={{
              ...styles.otherReason,
              ...{ display: this.state.otherReason.isVisible ? 'flex' : 'none' }
            }} value={this.state.otherReason.content}
            onChangeText={reason => this.handleAnotherReason(reason)} />

          <Button onPress={this.handleSendRequest} style={styles.button}>
            <Language>REQUEST_DAYOFF</Language>
          </Button>
        </KeyboardAvoidingView>
      </Content>
    );
  }
}