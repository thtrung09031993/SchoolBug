import React from 'react';
import { Animated, View, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';

import Language from 'common/language';

import { ANIMATION_TIME } from 'constants/common-data';

import AppIcon from 'assets/images/app-icon.png';

import { styles } from './notification-popup.style';

const NO_SPACE = 0;
const HEIGHT = 90;
const TIMEOUT = 5000;
const HIDE = -HEIGHT - (Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight);
const SHOW = 0;

export default class NotificationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topAnimation: new Animated.Value(HIDE)
    };
  }

  /**
   * Set timeout to close notification (including clear old timeout)
   * @param {Object} prevProps      Previous props
   * @return {undefined}
   */
  componentDidUpdate(prevProps) {
    if (this.props.isShowed) {
      clearTimeout(this.timeOutHideToaster);

      this.timeOutHideToaster = setTimeout(() => {
        this.props.hideNotification && this.props.hideNotification();
      }, TIMEOUT);
    }

    if (this.props.isShowed !== prevProps.isShowed) {
      Animated.timing(
        this.state.topAnimation,
        { toValue: this.props.isShowed ? SHOW : HIDE, duration: ANIMATION_TIME }
      ).start();
    }
  }

  handlePressNotification = () => {
    const { hideNotification, callback } = this.props;

    hideNotification && hideNotification();
    callback();
  }

  render() {
    const { title, body } = this.props;

    return (
      <Animated.View style={{ ...styles.notification, top: this.state.topAnimation }}>
        <TouchableOpacity style={styles.container} onPress={this.handlePressNotification}>
          <Image source={AppIcon} style={styles.icon} resizeMode='contain' />
          <View style={styles.content}>
            <Language style={styles.title}>{title}</Language>
            <Language style={styles.body}>{body}</Language>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
