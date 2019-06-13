import React from 'react';
import { View, TouchableOpacity, AppState } from 'react-native';
import { Toast } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import Language, { formatLanguage } from 'common/language';
import API from 'common/api';

import { PROFILE_API, USER, UNAUTHORIZED } from 'constants/api';
import { HOME, AUTHORIZATION } from 'constants/screen';

import { removeToken } from 'utils/storage';
import { unregisterDevice } from 'utils/notifications';

import { styles } from './activating.style';

export default class Activating extends React.Component {
  static navigationOptions = {
    title: 'ACTIVATING',
    header: null
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.getProfile();
    }
  };

  getProfile = async () => {
    const { setUserProfile, navigation } = this.props;

    try {
      const profile = await API.get(PROFILE_API);

      setUserProfile && setUserProfile(profile);

      if (profile[USER.IS_ACTIVE]) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: HOME })
          ]
        });

        navigation.dispatch(resetAction);
      }
    } catch (error) {
      if (error.status && error.status === UNAUTHORIZED) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: AUTHORIZATION })
          ]
        });

        navigation.dispatch(resetAction);

        Toast.show({
          text: formatLanguage('SESSION_EXPIRED'),
          buttonText: 'OK',
          type: 'warning'
        });
      } else {
        Toast.show({
          text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: error.status ? 'danger' : 'warning'
        });
      }
    }
  }

  handleLogOut = () => {
    const { navigation, resetUserStore } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: AUTHORIZATION })
      ]
    });

    removeToken();
    unregisterDevice();
    resetUserStore();
    navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Language style={styles.message}>INACTIVE_ACCOUNT</Language>

        <TouchableOpacity onPress={this.handleLogOut}>
          <Language>LOG_OUT</Language>
        </TouchableOpacity>
      </View>
    );
  }
}
