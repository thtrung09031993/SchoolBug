import React from 'react';
import { Animated, View, Linking } from 'react-native';
import { Icon, Button } from 'native-base';

import Language from 'common/language';
import { TRIP_DETAIL_STATUS } from 'constants/status';
import { ANIMATION_TIME } from 'constants/common-data';

import { styles, textStyles } from './popup.style';

import Child from 'driver/main/pages/school-drive/components/child';

const BOUNCE_SHOW = 0;
const BOUNCE_HIDE = 50;
const FADE_SHOW = 1;
const FADE_HIDE = 0;

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bounceAnimation: new Animated.Value(BOUNCE_HIDE),
      fadeAnimation: new Animated.Value(FADE_HIDE)
    };
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.item || prevProps.finished) && !this.props.item && !this.props.finished) {
      Animated.parallel([
        Animated.timing(
          this.state.fadeAnimation,
          { toValue: FADE_HIDE, duration: ANIMATION_TIME }
        ),
        Animated.timing(
          this.state.bounceAnimation,
          { toValue: BOUNCE_HIDE, duration: ANIMATION_TIME }
        )
      ]).start();
    }

    if (!prevProps.item && !prevProps.finished && (this.props.item || this.props.finished)) {
      Animated.parallel([
        Animated.timing(
          this.state.fadeAnimation,
          { toValue: FADE_SHOW, duration: ANIMATION_TIME }
        ),
        Animated.timing(
          this.state.bounceAnimation,
          { toValue: BOUNCE_SHOW, duration: ANIMATION_TIME }
        )
      ]).start();
    }
  }

  handleOpenPhoneCall = () => {
    const { phone } = this.props.item.information;

    Linking.openURL(`tel:${phone}`);
  }

  renderCustomer() {
    const { handleNotify, handleChild, item: { children, achieved }, index, isGoingToSchool } = this.props;
    const newAchieveStatus = isGoingToSchool ? TRIP_DETAIL_STATUS.PICKED_UP : TRIP_DETAIL_STATUS.FINISHED;

    return (
      <React.Fragment>
        {children.map((child, childIndex) =>
          <Child
            info={child}
            key={childIndex}
            isGoingToSchool={isGoingToSchool}
            handleAchieve={() => handleChild(index, childIndex, newAchieveStatus)}
            handleSkip={() => handleChild(index, childIndex, TRIP_DETAIL_STATUS.SKIPPED)}
          />
        )}

        {achieved ? null :
          <View style={styles.action}>
            <Button bordered style={styles.button} onPress={() => handleNotify(index)}>
              <Icon style={textStyles.button} ios='ios-notifications' android="md-notifications" />
              <Language style={textStyles.button}>NOTIFY</Language>
            </Button>
            <Button bordered style={styles.button} onPress={this.handleOpenPhoneCall}>
              <Icon style={textStyles.button} ios='ios-call' android="md-call" />
              <Language style={textStyles.button}>CALL</Language>
            </Button>
          </View>
        }
      </React.Fragment>
    );
  }

  renderSchool() {
    const { handleArriveSchool, item: { achieved }, index } = this.props;

    return (
      <View style={styles.action}>
        <Button
          style={achieved ? styles.buttonActive : styles.button}
          onPress={achieved ? () => {} : () => handleArriveSchool(index)}
          bordered
        >
          <Icon
            style={achieved ? textStyles.buttonActive : textStyles.button}
            ios='ios-checkmark'
            android="md-checkmark"
          />
          <Language style={achieved ? textStyles.buttonActive : textStyles.button}>
            ARRIVE
          </Language>
        </Button>
      </View>
    );
  }

  renderFinish() {
    const { handleFinish } = this.props;

    return (
      <View style={styles.action}>
        <Button style={styles.button} onPress={handleFinish} bordered>
          <Icon style={textStyles.button} ios='ios-checkmark' android="md-checkmark" />
          <Language style={textStyles.button}>FINISH</Language>
        </Button>
      </View>
    );
  }

  renderContent() {
    const { item, finished } = this.props;

    if (finished) {
      return this.renderFinish();
    }

    if (item) {
      const { information: { type } } = item;
      const isSchool = type === 'school';

      return isSchool ? this.renderSchool() : this.renderCustomer();
    }

    return null;
  }

  render() {
    const { bounceAnimation, fadeAnimation } = this.state;

    return (
      <Animated.View
        style={[
          styles.popup,
          { transform: [{translateY: bounceAnimation}], opacity: fadeAnimation }
        ]}>
        {this.renderContent()}
      </Animated.View>
    );
  }
}
