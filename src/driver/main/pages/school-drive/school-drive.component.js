import React from 'react';
import { Alert, LayoutAnimation } from 'react-native';
import { Toast } from 'native-base';
import { createAppContainer, createBottomTabNavigator, StackActions, NavigationEvents } from 'react-navigation';

import API from 'common/api';
import { formatLanguage } from 'common/language';

import { DRIVE_COMPLETION } from 'driver/constants/screen';
import { ORDER_DETAIL } from 'constants/screen';
import { THEME_COLOR } from 'constants/color';
import { ARRAY_FIRST, ARRAY_STEP, ANIMATION_TIME } from 'constants/common-data';
import {
  SERVICE,
  DAILY_TRIP,
  TRIP_DETAIL,
  TRIP_COMPLETION_API,
  ARRIVAL_API,
  SKIPPING_API,
  PICKING_UP_API,
  RETURNING_API,
  SCHOOL_ARRIVAL_API,
  ADDRESS,
  SIMPLE_TRIP_DETAIL_API
} from 'constants/api';
import { TRIP_DETAIL_STATUS } from 'constants/status';
import { getLocationAsync } from 'utils/map';

import RouteMap from './pages/route-map';
import RouteList from './pages/route-list';

import { parseTripDetailAPI } from './school-drive.util';


const TabScreens = createAppContainer(createBottomTabNavigator({
  RouteMap: { screen: RouteMap },
  RouteList: { screen: RouteList }
}, {
    tabBarOptions: {
      activeTintColor: THEME_COLOR,
      labelStyle: {
        fontSize: 12
      }
    }
  }));

export default class SchoolDrive extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('SCHOOL_DRIVE')
  });

  constructor(props) {
    super(props);

    this.map = React.createRef();

    this.state = {
      points: [],
      isGoingToSchool: true,
      dailyTripID: null
    };
  }

  getTripDetail = async () => {
    const { navigation, startLoading } = this.props;
    const driverServiceID = navigation.getParam('driverServiceID', null);

    startLoading && startLoading();

    let latitude = null;
    let longitude = null;
    const location = await getLocationAsync();

    if (!location.errorMessage) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }

    API.get(SIMPLE_TRIP_DETAIL_API, {
      [SERVICE.DRIVER_SERVICE_ID]: driverServiceID,
      [ADDRESS.LATITUDE]: latitude,
      [ADDRESS.LONGITUDE]: longitude
    })
      .then(res => this.setState(parseTripDetailAPI(res)))
      .catch(() => {
        Alert.alert(
          formatLanguage('SCHOOL_DRIVE'),
          formatLanguage('NO_TRIP_DETAIL'),
          [{ text: 'OK', onPress: navigation.goBack }],
          { cancelable: false }
        );
      });
  }

  handleNotify = index => {
    const { points } = this.state;
    const { children } = points[index];

    if (children.length) {
      API.post(ARRIVAL_API, { [TRIP_DETAIL.ID]: children[ARRAY_FIRST].tripDetailID })
        .catch(err => {
          Toast.show({
            text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
            buttonText: 'OK',
            type: err.status ? 'danger' : 'warning'
          });
        });
    }
  }

  updateChildStatus = (index, childIndex, status) => {
    const { points, isGoingToSchool } = this.state;
    const customer = points[index];
    const { children } = customer;

    const newChildren = [
      ...children.slice(ARRAY_FIRST, childIndex),
      { ...children[childIndex], status },
      ...children.slice(childIndex + ARRAY_STEP)
    ];

    const achieved = newChildren
      .filter(child =>
        child.status === TRIP_DETAIL_STATUS.WAITING ||
        (child.status === TRIP_DETAIL_STATUS.PICKED_UP && !isGoingToSchool)
      ).length ? undefined : true;

    if (achieved) {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: ANIMATION_TIME });
    }

    this.setState({
      points: [
        ...points.slice(ARRAY_FIRST, index),
        {
          ...customer,
          achieved,
          children: [
            ...children.slice(ARRAY_FIRST, childIndex),
            { ...children[childIndex], status },
            ...children.slice(childIndex + ARRAY_STEP)
          ]
        },
        ...points.slice(index + ARRAY_STEP)
      ]
    });
  }

  handleChild = (index, childIndex, type) => {
    const { isGoingToSchool, points } = this.state;
    const { children } = points[index];

    let url = null;

    if (type === TRIP_DETAIL_STATUS.SKIPPED) {
      url = SKIPPING_API;
    } else {
      url = isGoingToSchool ? PICKING_UP_API : RETURNING_API;
    }

    API.post(url, { [TRIP_DETAIL.ID]: children[childIndex].tripDetailID })
      .then(() => this.updateChildStatus(index, childIndex, type))
      .catch(err => {
        Toast.show({
          text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: err.status ? 'danger' : 'warning'
        });
      });
  }

  handleArriveSchool = index => {
    const { points, dailyTripID } = this.state;

    API.post(SCHOOL_ARRIVAL_API, { [DAILY_TRIP.ID]: dailyTripID }).then(() => {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: ANIMATION_TIME });
      this.setState({
        points: [
          ...points.slice(ARRAY_FIRST, index),
          { ...points[index], achieved: true },
          ...points.slice(index + ARRAY_STEP)
        ]
      });
    }).catch(err => {
      Toast.show({
        text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status ? 'danger' : 'warning'
      });
    });
  }

  handleFinish = () => {
    Alert.alert(
      formatLanguage('SCHOOL_DRIVE'),
      formatLanguage('TRIP_COMPLETED'),
      [{
        text: 'OK',
        onPress: () => {
          const { dispatch } = this.props.navigation;
          const { dailyTripID, isGoingToSchool } = this.state;

          if (isGoingToSchool) {
            dispatch(
              StackActions.replace({ routeName: DRIVE_COMPLETION, params: { dailyTripID } })
            );
          } else {
            const form = new FormData();

            form.append(DAILY_TRIP.ID, dailyTripID);
            form.append(DAILY_TRIP.MESSAGE, '');

            const customizedAPIOptions = {
              headers: { "Content-Type": "multipart/form-data" },
              body: form
            };

            API.post(TRIP_COMPLETION_API, {}, customizedAPIOptions)
              .then(() => dispatch(
                StackActions.replace({ routeName: ORDER_DETAIL, params: { dailyTripID } })
              )).catch(err => {
                Toast.show({
                  text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
                  buttonText: 'OK',
                  type: err.status ? 'danger' : 'warning'
                });
              });
          }
        }
      }],
      { cancelable: false }
    );
  }

  render() {
    const { points, isGoingToSchool } = this.state;
    const driverServiceID = this.props.navigation.getParam('driverServiceID', null);

    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={this.getTripDetail} />
        <TabScreens screenProps={{
          points,
          isGoingToSchool,
          driverServiceID,
          handleBack: this.props.navigation.goBack,
          handleNotify: this.handleNotify,
          handleChild: this.handleChild,
          handleArriveSchool: this.handleArriveSchool,
          handleFinish: this.handleFinish
        }} />
      </React.Fragment>
    );
  }
}
