import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Button, Toast } from 'native-base';

import Image from 'common/image';
import Language, { formatLanguage } from 'common/language';
import API from 'common/api';
import { toCustomizedDateString } from 'common/datetime-formatter';

import { formatCurrency } from 'utils/currency';

import { DAILY_TRIP, DRIVER_BILL_API, CUSTOMER_BILL_API } from 'constants/api';
import { TRIP_STATUS } from 'constants/status';
import { ARRAY_FIRST, ARRAY_STEP } from 'constants/common-data';

import Detail from './components/detail';
import Verification from './components/verification';

import { parseBillAPI, parseDriverAPI } from './order-detail.util';
import { styles, textStyles } from './order-detail.style';

import Point from 'assets/images/point-marker.png';
import Clock from 'assets/images/clock.png';
import School from 'assets/images/school.png';

const TRIP_CODE_START = 0;
const TRIP_CODE_LENGTH = 8;

export default class OrderDetail extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      bill: {},
      driver: {
        car: {}
      },
      showVerification: false
    };
  }

  componentDidMount() {
    this.getBillInfo();
  }

  getBillInfo = () => {
    const { appType } = this.props.screenProps;
    const dailyTripID = this.props.navigation.getParam('dailyTripID', null);

    if (appType === 'driver') {
      API.get(DRIVER_BILL_API, { [DAILY_TRIP.ID]: dailyTripID }).then(res => {
        const { name, username: phone, avatar } = this.props.profile;
        const { plateNo } = this.props.car;

        this.setState({ bill: parseBillAPI(res), driver: { name, phone, avatar, car: { plateNo } } });
      }).catch(err => {
        Toast.show({
          text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: err.status ? 'danger' : 'warning'
        });
      });
    } else {
      API.get(CUSTOMER_BILL_API, { [DAILY_TRIP.ID]: dailyTripID }).then(res => {
        this.setState({ bill: parseBillAPI(res), driver: parseDriverAPI(res) });
      }).catch(err => {
        Toast.show({
          text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: err.status ? 'danger' : 'warning'
        });
      });
    }
  }

  handleCloseVerification = () => {
    this.setState({ showVerification: false });
  }

  handleShowVerification = () => {
    this.setState({ showVerification: true });
  }

  handleContinue = () => {
    this.props.navigation.goBack();
  }

  renderGoToSchool = () => {
    const { startTime, endTime, children = [], school = {}, status } = this.state.bill;
    const isCancelled = status === TRIP_STATUS.CANCELLED;

    return (
      <React.Fragment>
        <View style={styles.detailContainer}>
          <View style={styles.timeline} />
          <Detail
            icon={Point}
            isCancelled={isCancelled}
            information={{ time: startTime, name: formatLanguage(isCancelled ? 'CANCELLED' : 'START') }}
          />
          {children.map((child, index) => <Detail icon={Clock} isCancelled={isCancelled} information={child} key={index} />)}
        </View>
        <Detail
          icon={School}
          isCancelled={isCancelled}
          information={{ time: endTime, name: school.name, address: school.address }}
        />
      </React.Fragment>
    );
  }

  renderGoHome = () => {
    const { startTime, children = [], school = {}, status } = this.state.bill;
    const isCancelled = status === TRIP_STATUS.CANCELLED;

    return (
      <React.Fragment>
        <View style={styles.detailContainer}>
          <View style={styles.timeline} />
          <Detail
            icon={Point}
            isCancelled={isCancelled}
            information={{ time: startTime, name: formatLanguage(isCancelled ? 'CANCELLED' : 'START') }}
          />
          <Detail
            icon={School}
            isCancelled={isCancelled}
            information={{ time: startTime, name: school.name, address: school.address }}
          />
          {children
            .slice(ARRAY_FIRST, children.length - ARRAY_STEP)
            .map((child, index) => <Detail icon={Clock} isCancelled={isCancelled} information={child} key={index} />)
          }
        </View>
        <Detail icon={Clock} information={children[children.length - ARRAY_STEP]} />
      </React.Fragment>
    );
  }

  render() {
    const { language, navigation } = this.props;
    const dailyTripID = navigation.getParam('dailyTripID', null);
    const { endTime, date, status, type, totalFee, completionImage, completionMessage } = this.state.bill;
    const { name, phone, avatar, car } = this.state.driver;
    const { showVerification } = this.state;
    const isCancelled = status === TRIP_STATUS.CANCELLED;

    const tripCode = dailyTripID ? `${dailyTripID.substring(TRIP_CODE_START, TRIP_CODE_LENGTH)}...` : '';

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Language style={textStyles.header}>ORDER_DETAIL</Language>
          </View>
          <View style={styles.right}>
            <Text style={textStyles.time}>{date ? toCustomizedDateString(date, language) : ''}</Text>
            <Text style={textStyles.time}>{endTime}</Text>
            <Language style={textStyles.tripID}>TRIP_CODE: {tripCode}</Language>
          </View>
        </View>

        <View style={styles.driver}>
          <Image style={styles.avatar} src={avatar} resizeMode='cover' />
          <View style={styles.information}>
            <Text style={textStyles.name}>{name}</Text>
            <Text style={textStyles.phone}>{phone}</Text>
            <Text style={textStyles.plateNumber}>{car.plateNo}</Text>
          </View>
        </View>

        <View style={styles.detail}>
          <Language style={textStyles.detail}>TRIP_DETAILS</Language>

          {type === 'GO_HOME' ? this.renderGoHome() : this.renderGoToSchool()}

          <View style={styles.total}>
            {
              isCancelled
                ? <Language style={textStyles.price}>CANCELLED</Language>
                : <React.Fragment>
                  <Language style={textStyles.price}>TOTAL</Language>
                  <Text style={textStyles.price}>{formatCurrency(totalFee)}</Text>
                </React.Fragment>
            }
          </View>
        </View>

        <View style={styles.footer}>
          {type === 'GO_TO_SCHOOL' && !isCancelled && completionImage
            ? <Button style={styles.button} onPress={this.handleShowVerification} block transparent>
              <Language style={textStyles.button}>SHOW_VERIFICATION</Language>
            </Button>
            : null
          }
          <Button style={styles.button} onPress={this.handleContinue} block bordered>
            <Language style={textStyles.button}>CONTINUE</Language>
          </Button>
        </View>

        <Verification
          visible={showVerification}
          image={completionImage}
          message={completionMessage}
          handleClose={this.handleCloseVerification}
        />
      </ScrollView>
    );
  }
}
