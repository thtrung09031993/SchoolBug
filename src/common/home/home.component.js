import React from 'react';
import { ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Drawer } from 'native-base';
import { Notifications } from 'expo';

import SideBar from './components/sidebar';
import NavigationBar from './components/navigation-bar';

import { styles } from './home.style';

import BackGroundMorning from 'assets/images/background-morning.png';
import BackGroundAfternoon from 'assets/images/background-afternoon.png';
import BackGroundEvening from 'assets/images/background-evening.png';

const MORNING_START = 5;
const AFTERNOON_START = 12;
const EVENING_START = 18;

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      header: <NavigationBar
                handleOpenDrawer={params.handleOpenDrawer}
                handleHomePress={params.handleHomePress}
              />
    };
  }

  constructor(props) {
    super(props);

    this.drawer = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleOpenDrawer: this.handleOpenDrawer,
      handleHomePress: () => {}
    });

    this._notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification = notification => {
    const { data: { page, params, body, title }, origin } = notification;
    const { showNotification, navigation } = this.props;

    if (origin === 'received') {
      showNotification && showNotification(
        title,
        body,
        () => {
          navigation.push(page, params);
          Notifications.dismissNotificationAsync(notification.notificationId);
        }
      );
    } else if (origin === 'selected') {
      navigation.push(page, params);
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: page, params })]
      // });

      // navigation.dispatch(resetAction);
    }
  }

  handleOpenDrawer = () => {
    this.drawer.current._root.open();
  }

  handleCloseDrawer = () => {
    this.drawer.current._root.close();
  }

  render() {
    const { screenProps: { appType } } = this.props;
    const drawerMenus = this.getDrawerMenus ? this.getDrawerMenus() : [];
    const hour = new Date().getHours();

    let background = null;

    if (hour >= MORNING_START && hour < AFTERNOON_START) background = BackGroundMorning;
    else if (hour >= AFTERNOON_START && hour < EVENING_START) background = BackGroundAfternoon;
    else background = BackGroundEvening;

    return (
      <Drawer
        ref={this.drawer}
        onClose={this.closeDrawer}
        content={
          <SideBar
            resetUserStore={this.props.resetUserStore}
            user={this.props.user}
            menus={drawerMenus}
            appType={appType}
          />
        }
      >
        <ImageBackground source={background} style={styles.container} resizeMode='cover'>
          {this.renderChildren && this.renderChildren()}
        </ImageBackground>
      </Drawer>
    );
  }
}
