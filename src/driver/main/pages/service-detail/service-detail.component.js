import React from 'react';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Content, Icon, Toast, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import { styles, themeColorStyles } from './service-detail.style';

import ChosenWeekdays from 'common/chosen-weekdays';
import Contract from './components/contract';
import NavigationBar from './components/navigation-bar';

import {
  SCHOOL,
  ADDRESS, SERVICE,
  CONTRACT,
  SERVICE_API,
  CHILDREN,
  ACCEPT_PENDING_CONTRACT_API,
  REJECT_PENDING_CONTRACT_API
} from 'constants/api';
import API from 'common/api';

import { SERVICE_OPENING } from 'driver/constants/screen';
import { TRIP_CANCELLATION, CANCELLATION_REVIEW, CONTRACT_CANCELLATION } from 'constants/screen';

import Language, { formatLanguage } from 'common/language';
import { formatTime } from 'common/datetime-formatter';
import Cover from 'common/cover';

import { getPlaceImage } from 'utils/map';

const CURRENT = 'CURRENT';
const INCOMING = 'INCOMING';
const PAST = 'PAST';

export default class ServiceDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationBar
        handleGoBack={() => navigation.goBack()}
        handleOptions={params.openOptions}
        imageUrl={params.imageUrl}
        startAddress={params.startAddress}
        stopAddress={params.stopAddress}
        isNotAvailable={params.isNotAvailable}
      />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      service: {
        [SERVICE.DRIVER_SERVICE_ID]: '',
        [SERVICE.DAYS_OF_WEEK]: [],
        [SCHOOL.SCHOOL]: {
          [SCHOOL.NAME]: '',
          [ADDRESS.ADDRESS]: {
            [ADDRESS.DETAIL]: ''
          }
        },
        [SERVICE.START_ADDRESS]: '',
        [SERVICE.START_TIME]: '',
        [SERVICE.ARRIVAL_TIME]: '',
        [SERVICE.RETURN_TIME]: '',
        [SERVICE.REGISTER_TIME]: '',
        [SERVICE.EXPIRED_TIME]: '',
        [SERVICE.CAPACITY_AVAILABLE]: '',
        [CONTRACT.ACTIVE_CONTRACT]: [],
        [CONTRACT.FUTURE_CONTRACT]: [],
        [CONTRACT.FINISHED_CONTRACT]: []
      },
      isOptionsVisible: false,
      isContractCancellationVisible: false,
      contractType: props.navigation.getParam("contractType", CURRENT),
      cancellingContractID: '',
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

  openContractCancellation = () => { this.setState({ isContractCancellationVisible: true }); }

  closeContractCancellation = () => {
    this.setState({
      isContractCancellationVisible: false,
      cancellingContractID: ''
    });
  }

  chooseContractToCancel = contractID => { this.setState({ cancellingContractID: contractID }); }

  goToCancelTrip = () => {
    this.closeOptions();
    const { service } = this.state;
    const { navigation } = this.props;

    navigation.push(TRIP_CANCELLATION, {
      driverServiceID: navigation.getParam("driverServiceID", null),
      schoolDays: service[SERVICE.DAYS_OF_WEEK]
    });
  }

  goToCancellationReview = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { service } = this.state;

    navigation.push(CANCELLATION_REVIEW, { driverServiceID: service[SERVICE.DRIVER_SERVICE_ID] });
  }

  goToCancelContract = () => {
    const { cancellingContractID } = this.state;
    const { navigation } = this.props;

    this.closeContractCancellation();
    navigation.push(CONTRACT_CANCELLATION, { contractID: cancellingContractID });
  }

  goToUpdateService = () => {
    this.closeOptions();
    const { navigation } = this.props;
    const { service } = this.state;

    navigation.push(SERVICE_OPENING, { service });
  }

  handleDeleteService = () => {
    Alert.alert(
      formatLanguage('DELETE_SERVICE_TITLE'),
      formatLanguage('DELETE_SERVICE_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.deleteService }
      ],
      { cancelable: true },
    );
  }

  deleteService = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam("driverServiceID", null);

    this.closeOptions();
    try {
      await API.delete(SERVICE_API,
        { [SERVICE.DRIVER_SERVICE_ID]: id }
      );

      Toast.show({
        text: formatLanguage('SERVICE_DELETED'),
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

  getService = async () => {
    try {
      const { navigation } = this.props;
      const id = navigation.getParam("driverServiceID", null);

      if (id) {
        const service = await API.get(SERVICE_API, {
          [SERVICE.DRIVER_SERVICE_ID]: id
        });

        this.setSchoolImage(service[SCHOOL.SCHOOL][SCHOOL.NAME]);
        this.setAddress(service[SERVICE.START_ADDRESS], service[SCHOOL.SCHOOL][SCHOOL.NAME]);
        this.setState({ service, isLoaded: true });

        if (service[SERVICE.EXPIRED_TIME]) {
          this.setState({ contractType: PAST });
        }

        navigation.setParams({
          isNotAvailable: service[SERVICE.EXPIRED_TIME]
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

  setAddress = (startAddress, stopAddress) => {
    this.props.navigation.setParams({
      startAddress, stopAddress
    });
  }

  setSchoolImage = async (place) => {
    const imageUrl = await getPlaceImage(place);

    this.props.navigation.setParams({
      imageUrl
    });
  };

  handleChooseContractType = contractType => this.setState({ contractType });

  handleAcceptPendingContract = id => {
    API.put(`${ACCEPT_PENDING_CONTRACT_API}?${CONTRACT.CONTRACT_ID}=${id}`).then(() => {
      this.getService();
      Toast.show({
        text: formatLanguage('ACCEPTED'),
        buttonText: 'OK',
        type: 'success'
      });
    }).catch(err => {
      Toast.show({
        text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status ? 'danger' : 'warning'
      });
    });
  }

  handleRejectPendingContract = id => {
    API.put(`${REJECT_PENDING_CONTRACT_API}?${CONTRACT.CONTRACT_ID}=${id}`).then(() => {
      this.getService();
      Toast.show({
        text: formatLanguage('REJECTED'),
        buttonText: 'OK',
        type: 'success'
      });
    }).catch(err => {
      Toast.show({
        text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status ? 'danger' : 'warning'
      });
    });
  }

  render() {
    const { service, contractType, isLoaded } = this.state;
    const isNotAvailable = service[SERVICE.EXPIRED_TIME];

    let choosingContract = CONTRACT.ACTIVE_CONTRACT;

    if (contractType === INCOMING) {
      choosingContract = CONTRACT.FUTURE_CONTRACT;
    } else if (contractType === PAST) {
      choosingContract = CONTRACT.FINISHED_CONTRACT;
    }

    const themeStyle = isNotAvailable ? themeColorStyles.history : themeColorStyles.active;

    return (
      <React.Fragment>
        <Content style={styles.container}>
          <NavigationEvents onDidFocus={this.getService} />

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="today" />
            </View>
            <View style={styles.rightCol}>
              <ChosenWeekdays theme={themeStyle}
                chosenDays={service[SERVICE.DAYS_OF_WEEK]} />
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="time" />
            </View>
            <View style={styles.rightCol}>
              <Language style={styles.title}>GOING_TRIP</Language>
              <Language>: {formatTime(service[SERVICE.START_TIME])} - {formatTime(service[SERVICE.ARRIVAL_TIME])}</Language>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="time" />
            </View>
            <View style={styles.rightCol}>
              <Language style={styles.title}>RETURN_TRIP</Language>
              <Language>: {formatTime(service[SERVICE.RETURN_TIME])}</Language>
            </View>
          </View>

          <View style={styles.detailItem}>
            <View style={styles.leftCol}>
              <Icon style={{ ...styles.icon, ...themeStyle }} name="car" />
            </View>
            <View style={styles.rightCol}>
              <Language>
                AVAILABLE_SEAT: {(service[CONTRACT.ACTIVE_CONTRACT] || []).reduce(
                  (total, contract) => total - contract[CHILDREN.CHILDREN].length,
                  service[SERVICE.CAPACITY_AVAILABLE]
                )}
              </Language>
            </View>
          </View>

          <View style={styles.contract}>
            <Language style={styles.contractTitle}>YOUR_CONTRACT: {contractType}</Language>
            <Contract
              openContractCancellation={this.openContractCancellation}
              chooseContractToCancel={this.chooseContractToCancel}
              contracts={service[choosingContract] || []}
              handleAcceptPendingContract={this.handleAcceptPendingContract}
              handleRejectPendingContract={this.handleRejectPendingContract}
            />
          </View>

          <Modal animationType="fade" transparent
            onRequestClose={this.closeContractCancellation} visible={this.state.isContractCancellationVisible}>
            <TouchableOpacity onPress={this.closeContractCancellation} style={styles.dim}></TouchableOpacity>
            <View style={styles.options}>
              <TouchableOpacity onPress={this.goToCancelContract}
                style={{ ...styles.option, ...styles.splitStyle }} >
                <View style={styles.optionTitle}>
                  <Icon name="trash" style={styles.deleteOption} />
                </View>
                <View style={styles.optionContent}>
                  <Language style={styles.update}>CANCEL_CONTRACT</Language>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal animationType="fade" transparent
            onRequestClose={this.closeOptions} visible={this.state.isOptionsVisible}>
            <TouchableOpacity onPress={this.closeOptions} style={styles.dim}></TouchableOpacity>
            <View style={styles.options}>
              {
                (service[CONTRACT.ACTIVE_CONTRACT] || []).length || (service[CONTRACT.FUTURE_CONTRACT] || []).length
                  ?
                  <View>
                    <TouchableOpacity onPress={this.goToCancellationReview} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="calendar" style={styles.viewOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.update}>VIEW_OFF_DAYS</Language>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToCancelTrip} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="close" style={styles.deleteOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.update}>CANCEL_TRIP</Language>
                      </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View>
                    <TouchableOpacity onPress={this.goToUpdateService} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="create" style={styles.updateOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.update}>UPDATE_SERVICE</Language>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleDeleteService} style={styles.option}>
                      <View style={styles.optionTitle}>
                        <Icon name="trash" style={styles.deleteOption} />
                      </View>
                      <View style={styles.optionContent}>
                        <Language style={styles.update}>DELETE_SERVICE</Language>
                      </View>
                    </TouchableOpacity>
                  </View>
              }
            </View>
          </Modal>

        </Content>

        <Cover isLoaded={isLoaded} />

        {isNotAvailable
          ? null
          : <View style={styles.bottomTabsContainer}>
            <Button style={styles.bottomTab} onPress={() => this.handleChooseContractType(CURRENT)} transparent>
              <Language style={contractType === CURRENT ? styles.tabTextActive : styles.tabTextInactive}>
                CURRENT
                </Language>
            </Button>
            <Button style={styles.bottomTab} onPress={() => this.handleChooseContractType(INCOMING)} transparent>
              <Language style={contractType === INCOMING ? styles.tabTextActive : styles.tabTextInactive}>
                INCOMING
                </Language>
            </Button>
            <Button style={styles.bottomTab} onPress={() => this.handleChooseContractType(PAST)} transparent>
              <Language style={contractType === PAST ? styles.tabTextActive : styles.tabTextInactive}>
                PAST
                </Language>
            </Button>
          </View>
        }
      </React.Fragment >
    );
  }
}
