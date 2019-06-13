import React from 'react';
import { View, Toast, Button, Text, Content, Icon } from 'native-base';
import { TouchableOpacity, Modal, Alert } from 'react-native';
import Language, { formatLanguage } from 'common/language';
import API from 'common/api';
import {
  CUSTOMER_CANCELLATION_REQUEST_API,
  DRIVER_CANCELLATION_REQUEST_API, SERVICE, REQUIREMENT
} from 'constants/api';
import { CHOOSE_SERVICE } from 'customer/constants/screen';
import { styles } from './cancellation-review.style';
import Cover from 'common/cover';
import CancelRequest from './components/cancel-request';
import { parseCancellationRequests, parseTempContractDriver } from './cancellation-review.util';
import Image from 'common/image';

export default class CancellationReview extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: formatLanguage('VIEW_OFF_DAYS'),
      headerRight:
        <TouchableOpacity onPress={params.toggleShowing} style={styles.headerRight}>
          <Language style={styles.headerRightText}>
            {
              params.appType === 'driver'
                ?
                `${params.isDriver ? 'CUSTOMER_DAY_OFF' : 'YOUR_DAY_OFF'}`
                :
                `${params.isDriver ? 'YOUR_DAY_OFF' : 'DRIVER_DAY_OFF'}`
            }
          </Language>
        </TouchableOpacity>
    };
  };

  constructor(props) {
    super(props);
    const { screenProps: { appType } } = props;

    this.state = {
      cancellationRequests: {
        driver: [],
        customer: []
      },
      isDriver: appType === 'driver',
      isLoaded: true,
      isTempContractVisible: false,
      tempContract: null,
      driverServiceID: ''
    };
  }

  showTempContract = tempContract => { this.setState({ isTempContractVisible: true, tempContract }); }

  hideTempContract = () => { this.setState({ isTempContractVisible: false }); }

  setTempContract = tempContract => { this.setState({ tempContract }); }

  chooseAlternativeDriver = (driverServiceID, offDay) => {
    Alert.alert(
      formatLanguage('CHOOSE_ALTERNATIVE_TITLE'),
      formatLanguage('CHOOSE_ALTERNATIVE_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.goToChoosingAlternativeDriver(driverServiceID, offDay) }
      ],
      { cancelable: true },
    );
  }

  goToChoosingAlternativeDriver = (driverServiceID, offDay) => {
    const { navigation } = this.props;
    const customerRequirementID = navigation.getParam('customerRequirementID', null);
    // alert(`${customerRequirementID}, ${driverServiceID}, ${offDay}`)

    navigation.push(CHOOSE_SERVICE, { customerRequirementID, driverServiceID, offDay });
  }

  componentDidMount() {
    const { navigation, screenProps: { appType } } = this.props;
    const { isDriver } = this.state;

    this.getCancellationRequests();
    navigation.setParams({
      isDriver, appType,
      toggleShowing: this.toggleShowing
    });

  }

  toggleShowing = () => {
    const { navigation } = this.props;
    const { isDriver } = this.state;

    this.setState({ isDriver: !isDriver });

    navigation.setParams({ isDriver: !isDriver });
  }

  goBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  }

  getCancellationRequests = async () => {
    try {
      const { navigation, screenProps: { appType } } = this.props;
      const apiLink = appType === 'driver' ? DRIVER_CANCELLATION_REQUEST_API : CUSTOMER_CANCELLATION_REQUEST_API;
      const param = appType === 'driver'
        ? { [SERVICE.DRIVER_SERVICE_ID]: navigation.getParam('driverServiceID', '') }
        : { [REQUIREMENT.CUSTOMER_REQUIREMENT_ID]: navigation.getParam('customerRequirementID', '') };
      const response = await API.get(apiLink, param);

      this.setState({
        cancellationRequests: parseCancellationRequests(response, appType)
      });
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
    const { isLoaded, isDriver, cancellationRequests, tempContract } = this.state;
    const driver = parseTempContractDriver(tempContract);

    return (
      <React.Fragment>
        <Content>
          <Language style={styles.title}>
            {
              appType === 'driver'
                ?
                `BELONG ${isDriver ? 'YOUR_DAY_OFF' : 'CUSTOMER_DAY_OFF'}`
                :
                `BELONG ${isDriver ? 'DRIVER_DAY_OFF' : 'YOUR_DAY_OFF'}`
            }
          </Language>

          <View style={styles.container}>
            {
              cancellationRequests[isDriver ? 'driver' : 'customer'].map((request, index) => {
                return (
                  appType === 'customer' && isDriver
                    ?
                    <TouchableOpacity onPress={
                      request.tempContract
                        ?
                        () => { this.showTempContract(request.tempContract); }
                        :
                        () => { this.chooseAlternativeDriver(request.driverServiceID, request.offDay); }
                    } key={index}>
                      <CancelRequest appType={appType} request={request} type={isDriver ? 'driver' : 'customer'} />
                    </TouchableOpacity>
                    :
                    <CancelRequest key={index} request={request} type={isDriver ? 'driver' : 'customer'} />
                );
              })
            }
          </View>

          <Button style={styles.button} onPress={this.goBack}>
            <Text>OK</Text>
          </Button>

          <Modal animationType="fade" onRequestClose={this.hideTempContract}
            visible={this.state.isTempContractVisible}
            transparent={true}>
            <TouchableOpacity onPress={this.hideTempContract} style={styles.dim}>
              <View style={styles.driverContainer}>

                <View style={styles.driverItem}>
                  <Image src={driver.avatar} style={styles.avatar} resizeMode='cover' />
                  <View style={styles.name}>
                    <View style={styles.topName}>
                      <Icon name='car' style={styles.icon} />
                      <Language>DRIVER</Language>
                    </View>
                    <Text style={styles.nameText}>{driver.name}</Text>
                  </View>
                </View>

                <View style={styles.driverItem}>
                  <View style={styles.leftCol}>
                    <Icon name='call' style={styles.icon} />
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{driver.phone}</Text>
                  </View>
                </View>

                <View style={styles.driverItem}>
                  <View style={styles.leftCol}>
                    <Icon name='pin' style={styles.icon} />
                  </View>
                  <View style={styles.rightCol}>
                    <Text>{driver.address}</Text>
                  </View>
                </View>

                <View style={styles.driverItem}>
                  <View style={styles.leftCol}>
                    <Icon name='car' style={styles.icon} />
                  </View>
                  <View style={styles.rightCol}>
                    <Language>{driver.car}</Language>
                    <Language>CAPACITY: {driver.capacity}</Language>
                  </View>
                </View>

                <View style={styles.driverItem}>
                  <View style={styles.leftCol}>
                    <Icon name='browsers' style={styles.icon} />
                  </View>
                  <View style={styles.rightCol}>
                    <Language>{driver.plate}</Language>
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </Modal>
        </Content>

        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}