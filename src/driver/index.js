import React from 'react';
import { YellowBox, UIManager, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, registerRootComponent } from 'expo';

import LoadingGif from 'assets/images/loading.gif';
import AppIcon from 'assets/images/app-icon.png';
import Home from 'assets/images/house-big.png';
import Clock from 'assets/images/clock.png';
import Point from 'assets/images/point-marker.png';
import Automobile from 'assets/images/automobile.png';
import School from 'assets/images/school.png';
import SchoolBig from 'assets/images/school-big.png';
import SchoolGray from 'assets/images/school-grayscale.png';
import BackGroundMorning from 'assets/images/background-morning.png';
import BackGroundAfternoon from 'assets/images/background-afternoon.png';
import BackGroundEvening from 'assets/images/background-evening.png';
import DefaultImage from 'assets/images/default-profile.png';
import DefaultSchool from 'assets/images/defaultSchool.jpg';
import NoImage from 'assets/images/no-image.png';
import Kid from 'assets/images/kid.png';
import ParentsIcon from 'assets/images/parents.png';
import ServiceIcon from 'assets/images/service.png';
import RegisterIcon from 'assets/images/register.png';
import ChildrenIcon from 'assets/images/children.png';
import OrdersIcon from 'assets/images/orders.png';
import FontSpaceMono from 'assets/fonts/SpaceMono-Regular.ttf';
import FontPacifico from 'assets/fonts/Pacifico.ttf';
import FontRoboto from 'native-base/Fonts/Roboto.ttf';
import FontRobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';

import Main from './main';

if (__DEV__) {
  // eslint-disable-next-line
  import('utils/reactotron').then(() => console.log('Reactotron Configured'));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        LoadingGif,
        AppIcon,
        Home,
        Clock,
        Point,
        Automobile,
        School,
        SchoolBig,
        SchoolGray,
        BackGroundMorning,
        BackGroundAfternoon,
        BackGroundEvening,
        DefaultImage,
        DefaultSchool,
        NoImage,
        Kid,
        ParentsIcon,
        ServiceIcon,
        RegisterIcon,
        ChildrenIcon,
        OrdersIcon
      ]),
      Font.loadAsync({
        'space-mono': FontSpaceMono,
        'Pacifico': FontPacifico,
        'Roboto': FontRoboto,
        'Roboto_medium': FontRobotoMedium
      })
    ]);
  };

  handleLoadingError = error => {
    // Reporting service, for example Sentry
    // eslint-disable-next-line
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Main />
      </View>
    );
  }
}

export default registerRootComponent(App);
