import React from 'react';
import { View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Text, Content, Icon, Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import Language, { formatLanguage } from 'common/language';
import ChildrenList from 'common/children-list';
import ChosenWeekdays from 'common/chosen-weekdays';
import { formatDate, formatTime } from 'common/datetime-formatter';
import Cover from 'common/cover';

import Header from './components/header';
import Trip from './components/trip';
import NoContract from './components/no-contract';

import {
  CHILDREN, SCHOOL,
  ADDRESS, SERVICE,
  CONTRACT,
  USER, REQUIREMENT,
  REQUIREMENT_API,
  SERVICE_REQUEST_API
} from 'constants/api';
import API from 'common/api';

import { CHOOSE_SERVICE, FEEDBACK, SERVICE_REQUIREMENT, CONTRACT_EXTENDING } from 'customer/constants/screen';
import { TRIP_CANCELLATION, CANCELLATION_REVIEW, CONTRACT_CANCELLATION } from 'constants/screen';

import Contract from './components/contract';
import { styles, themeColorStyles } from './requirement-detail.style';
import { CONTRACT_STATUS } from 'constants/status';

export default class RequirementDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <Header isAvailable={params.isAvailable} goBack={() => navigation.goBack()}
        findingDriver={params.findingDriver} openOptions={params.openOptions} />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      requirement: {
        [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: '',
        [CHILDREN.CHILDREN]: [],
        [SERVICE.DAYS_OF_WEEK]: '',
        [SCHOOL.SCHOOL]: {
          [SCHOOL.NAME]: '',
          [ADDRESS.ADDRESS]: {
            [ADDRESS.DETAIL]: ''
          }
        },
        [REQUIREMENT.PICK_UP_ADDRESS]: {
          [ADDRESS.DETAIL]: ''
        },
        [REQUIREMENT.PICK_UP_TIME]: new Date(),
        [REQUIREMENT.ARRIVAL_TIME]: new Date(),
        [REQUIREMENT.RETURN_TIME]: new Date(),
        [REQUIREMENT.START_DATE]: new Date(),
        [REQUIREMENT.END_DATE]: new Date(),
        [REQUIREMENT.STATUS]: false
      },
      isOptionsVisible: false,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      openOptions: this.openOptions
    });
  }

  openOptions = () => { this.setState({ isOptionsVisible: true }); }

  closeOptions = () => { this.setState({ isOptionsVisible: false }); }

  goToContractExtending = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { requirement } = this.state;

    navigation.push(CONTRACT_EXTENDING, {
      contractID: requirement[CONTRACT.CONTRACT][CONTRACT.CONTRACT_ID],
      endDate: requirement[REQUIREMENT.END_DATE]
    });
  }

  handleCancelContractExtending = () => {
    Alert.alert(
      formatLanguage('CANCEL_EXTEND_CONTRACT_TITLE'),
      formatLanguage('CANCEL_EXTEND_CONTRACT_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.cancelContractExtending }
      ],
      { cancelable: true },
    );
  }

  cancelContractExtending = async () => {
    this.closeOptions();
    try {
      const { requirement } = this.state;
      const contractID = requirement[CONTRACT.CONTRACT][CONTRACT.CONTRACT_ID];

      await API.delete(SERVICE_REQUEST_API, { [CONTRACT.CONTRACT_ID]: contractID });

      Toast.show({
        text: formatLanguage('CANCEL_EXTEND_CONTRACT_SUCCESSFULLY'),
        buttonText: 'OK',
        type: 'success'
      });
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  goToFeedback = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { requirement } = this.state;

    navigation.push(FEEDBACK, {
      driver: requirement[CONTRACT.CONTRACT][USER.DRIVER],
      driverServiceID: requirement[CONTRACT.CONTRACT][SERVICE.DRIVER_SERVICE_ID]
    });
  }

  goToCancelTrip = () => {
    this.closeOptions();
    const { requirement } = this.state;

    this.props.navigation.push(TRIP_CANCELLATION, {
      contractID: requirement[CONTRACT.CONTRACT][CONTRACT.CONTRACT_ID],
      children: requirement[CHILDREN.CHILDREN],
      schoolDays: requirement[SERVICE.DAYS_OF_WEEK]
    });
  }

  goToCancellationReview = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { requirement } = this.state;

    navigation.push(CANCELLATION_REVIEW, { customerRequirementID: requirement[REQUIREMENT.CUSTOMER_REQUIREMENT_ID] });
  }

  goToContractCancellation = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { requirement } = this.state;
    const contractID = requirement[CONTRACT.CONTRACT][CONTRACT.CONTRACT_ID];

    navigation.push(CONTRACT_CANCELLATION, { contractID });
  }

  handleCancelRequest = () => {
    Alert.alert(
      formatLanguage('CANCEL_REQUEST_TITLE'),
      formatLanguage('CANCEL_REQUEST_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.cancelRequest }
      ],
      { cancelable: true },
    );
  }

  cancelRequest = async () => {
    this.closeOptions();
    try {
      const { requirement } = this.state;
      const contractID = requirement[CONTRACT.CONTRACT][CONTRACT.CONTRACT_ID];

      await API.delete(SERVICE_REQUEST_API, { [CONTRACT.CONTRACT_ID]: contractID });
      Toast.show({
        text: formatLanguage('CANCEL_REQUEST_SUCCESSFULLY'),
        buttonText: 'OK',
        type: 'success'
      });

      this.getRequirementDetail();
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  goToUpdateRequirement = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { requirement } = this.state;

    navigation.push(SERVICE_REQUIREMENT, { requirement });
  }

  handleDeleteRequirement = () => {
    Alert.alert(
      formatLanguage('DELETE_REQUIREMENT_TITLE'),
      formatLanguage('DELETE_REQUIREMENT_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.deleteRequirement }
      ],
      { cancelable: true },
    );
  }

  deleteRequirement = async () => {
    const { requirement } = this.state;
    const id = requirement[REQUIREMENT.CUSTOMER_REQUIREMENT_ID];
    const { navigation } = this.props;

    this.closeOptions();
    try {
      await API.delete(REQUIREMENT_API,
        { [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: id }
      );

      Toast.show({
        text: formatLanguage('REQUIREMENT_DELETED'),
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

  handleFindDriver = () => {
    const { navigation } = this.props;
    const customerRequirementID = navigation.getParam("customerRequirementID", null);
    const { requirement } = this.state;

    navigation.push(CHOOSE_SERVICE, {
      customerRequirementID,
      startAddress: requirement[REQUIREMENT.PICK_UP_ADDRESS][ADDRESS.DETAIL],
      school: requirement[SCHOOL.SCHOOL][SCHOOL.NAME],
      startDate: new Date(requirement[REQUIREMENT.START_DATE]),
      endDate: new Date(requirement[REQUIREMENT.END_DATE]),
      weekdays: requirement[SERVICE.DAYS_OF_WEEK].split(','),
      numberOfChildren: requirement[CHILDREN.CHILDREN].length
    });
  }

  getRequirementDetail = async () => {
    try {
      const { navigation } = this.props;
      const id = navigation.getParam("customerRequirementID", null);

      if (id) {
        const requirement = await API.get(REQUIREMENT_API, {
          [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: id
        });

        this.setState({
          requirement,
          isLoaded: true,
          extendingDate: new Date(requirement[REQUIREMENT.END_DATE])
        });

        navigation.setParams({
          isAvailable: requirement[REQUIREMENT.STATUS],
          findingDriver:
            !requirement[CONTRACT.CONTRACT] || requirement[CONTRACT.CONTRACT][CONTRACT.STATUS] === 'PENDING'
              ? true
              : null
        });
      }
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { isLoaded, requirement } = this.state;
    const isAvailable = requirement[REQUIREMENT.STATUS];

    let themeStyle = {};

    let futureThemeStyle = {};

    if (isAvailable) {
      themeStyle = requirement[CONTRACT.CONTRACT] && requirement[CONTRACT.CONTRACT][CONTRACT.STATUS] === 'ACTIVE'
        ? themeColorStyles.active
        : themeColorStyles.pending;
      futureThemeStyle = requirement[CONTRACT.FUTURE_CONTRACT]
        && requirement[CONTRACT.FUTURE_CONTRACT][CONTRACT.STATUS] === 'FUTURE'
        ? themeColorStyles.active
        : themeColorStyles.pending;
    } else {
      themeStyle = themeColorStyles.history;
      futureThemeStyle = themeColorStyles.history;
    }

    return (
      <React.Fragment>
        <Content>
          <NavigationEvents onDidFocus={this.getRequirementDetail} />
          {
            isAvailable
              ?
              <View style={styles.contract}>
                {requirement[CONTRACT.CONTRACT]
                  ?
                  <Contract contract={requirement[CONTRACT.CONTRACT]}
                    driverServiceID={requirement[SERVICE.DRIVER_SERVICE_ID]} />
                  :
                  <NoContract handleFindDriver={this.handleFindDriver} />
                }
              </View>
              :
              null
          }

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="people" />
            </View>
            <View style={styles.rightCol}>
              <ChildrenList isRowStyle={true} childrenList={requirement[CHILDREN.CHILDREN]} />
            </View>
          </View>

          <Trip theme={themeStyle}
            from={requirement[REQUIREMENT.PICK_UP_ADDRESS][ADDRESS.DETAIL]}
            to={requirement[SCHOOL.SCHOOL][SCHOOL.NAME]} />

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="timer" />
            </View>
            <View style={styles.rightCol}>
              <Language style={themeStyle}>GOING_TRIP</Language>
              <Text>
                : {formatTime(requirement[REQUIREMENT.PICK_UP_TIME])} - {formatTime(requirement[REQUIREMENT.ARRIVAL_TIME])}
              </Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="timer" />
            </View>
            <View style={styles.rightCol}>
              <Language style={themeStyle}>RETURN_TRIP</Language>
              <Text>: {formatTime(requirement[REQUIREMENT.RETURN_TIME])}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="today" />
            </View>
            <View style={styles.rightCol}>
              <ChosenWeekdays theme={themeStyle} chosenDays={requirement[SERVICE.DAYS_OF_WEEK].split(',')} />
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="calendar" />
            </View>
            <View style={styles.rightCol}>
              <Text>{formatDate(requirement[REQUIREMENT.START_DATE])} </Text>
              <Icon style={themeStyle} name='arrow-round-forward' />
              <Text style={requirement[CONTRACT.FUTURE_CONTRACT]
                && requirement[CONTRACT.FUTURE_CONTRACT][CONTRACT.STATUS] === CONTRACT_STATUS.FUTURE
                ?
                themeStyle
                :
                {}
              }>
                {` ${formatDate(requirement[REQUIREMENT.END_DATE])}`}
              </Text>
            </View>
          </View>

          {
            requirement[CONTRACT.FUTURE_CONTRACT]
              ?
              <View style={styles.extendingDate}>
                <Language style={futureThemeStyle}>
                  {
                    requirement[CONTRACT.FUTURE_CONTRACT][CONTRACT.STATUS] === 'EXTENDING'
                      ?
                      'WAIT_FOR_EXTENDING'
                      :
                      'EXTENDED'
                  }
                </Language>
              </View>
              :
              null
          }
          <Modal animationType="fade" transparent
            onRequestClose={this.closeOptions} visible={this.state.isOptionsVisible}>
            <TouchableOpacity onPress={this.closeOptions} style={styles.dim}></TouchableOpacity>
            <View style={styles.options}>
              {
                requirement[CONTRACT.CONTRACT] && requirement[CONTRACT.CONTRACT][CONTRACT.STATUS] === 'ACTIVE'
                  ?
                  <View>
                    {
                      requirement[CONTRACT.FUTURE_CONTRACT]
                        ?
                        <React.Fragment>
                          {
                            requirement[CONTRACT.FUTURE_CONTRACT][CONTRACT.STATUS] === 'EXTENDING'
                              ?
                              <TouchableOpacity onPress={this.handleCancelContractExtending} style={styles.option}>
                                <View style={styles.optionTitle}>
                                  <Icon name="trash" style={styles.deleteOption} />
                                </View>
                                <View style={styles.optionContent}>
                                  <Language style={styles.deleteOption}>CANCEL_EXTEND_CONTRACT</Language>
                                </View>
                              </TouchableOpacity>
                              :
                              null
                          }
                        </React.Fragment>
                        :
                        <TouchableOpacity onPress={this.goToContractExtending} style={styles.option}>
                          <View style={styles.optionTitle}>
                            <Icon name="mail-open" style={styles.updateOption} />
                          </View>
                          <View style={styles.optionContent}>
                            <Language style={styles.updateOption}>EXTEND_CONTRACT</Language>
                          </View>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={this.goToFeedback} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="star" style={styles.updateOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.updateOption}>GIVE_FEEDBACK</Language>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToContractCancellation}
                      style={{ ...styles.option, ...styles.splitStyle }}>
                      <View style={styles.optionTitle}>
                        <Icon name="trash" style={styles.deleteOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.deleteOption}>CANCEL_CONTRACT</Language>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToCancellationReview} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="calendar" style={styles.viewOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.viewOption}>VIEW_OFF_DAYS</Language>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToCancelTrip} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="close" style={styles.deleteOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.deleteOption}>CANCEL_TRIP</Language>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View>
                    {
                      requirement[CONTRACT.CONTRACT] && requirement[CONTRACT.CONTRACT][CONTRACT.STATUS] === 'PENDING'
                        ?
                        <TouchableOpacity onPress={this.handleCancelRequest}
                          style={{ ...styles.option, ...styles.splitStyle }}>
                          <View style={styles.optionTitle}>
                            <Icon name="trash" style={styles.deleteOption} />
                          </View>
                          <View style={styles.optionContent}>
                            <Language style={styles.update}>CANCEL_REQUEST</Language>
                          </View>
                        </TouchableOpacity>
                        :
                        <View>
                          <TouchableOpacity onPress={this.goToUpdateRequirement} style={styles.option}>
                            <View style={styles.optionTitle}>
                              <Icon name="create" style={styles.updateOption} />
                            </View>
                            <View style={styles.optionContent}>
                              <Language style={styles.update}>UPDATE_REQUIREMENT</Language>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this.handleDeleteRequirement} style={styles.option}>
                            <View style={styles.optionTitle}>
                              <Icon name="trash" style={styles.deleteOption} />
                            </View>
                            <View style={styles.optionContent}>
                              <Language style={styles.update}>DELETE_REQUIREMENT</Language>
                            </View>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
              }
            </View>
          </Modal>

        </Content >
        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}
