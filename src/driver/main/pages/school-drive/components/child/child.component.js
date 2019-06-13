import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';

import Image from 'common/image';

import { TRIP_DETAIL_STATUS } from 'constants/status';

import Kid from 'assets/images/kid.png';

import { styles, textStyles } from './child.style';

export default class Child extends React.Component {
  render() {
    const { info, handleAchieve, handleSkip, isGoingToSchool, style = {} } = this.props;
    const { avatar, name, className, status } = info;
    const achieved =
      (status !== TRIP_DETAIL_STATUS.WAITING) &&
      (isGoingToSchool || status !== TRIP_DETAIL_STATUS.PICKED_UP);

    return (
      <TouchableOpacity style={[styles.container, style]}>
        <Image style={styles.avatar} defaultSource={Kid} src={avatar} resizeMode='cover' />
        <View style={styles.information}>
          <Text style={textStyles.name}>{name}</Text>
          <Text numberOfLines={1} style={textStyles.description}>{className}</Text>
        </View>
        {achieved ? null :
          <React.Fragment>
            <TouchableOpacity style={styles.buttonAchieve} onPress={handleAchieve} rounded bordered>
              <Icon style={styles.iconAchieve} android='md-checkmark' ios='ios-checkmark' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSkip} onPress={handleSkip} rounded bordered>
              <Icon style={styles.iconSkip} android='md-close' ios='ios-close' />
            </TouchableOpacity>
          </React.Fragment>
        }
        {achieved && (status === TRIP_DETAIL_STATUS.PICKED_UP || status === TRIP_DETAIL_STATUS.FINISHED) ?
          <TouchableOpacity style={styles.buttonAchieveActive} rounded bordered>
            <Icon style={styles.iconActive} android='md-checkmark' ios='ios-checkmark' />
          </TouchableOpacity>
          : null
        }
        {achieved && (status === TRIP_DETAIL_STATUS.SKIPPED || status === TRIP_DETAIL_STATUS.CANCELLED) ?
          <TouchableOpacity style={styles.buttonSkipActive} rounded bordered>
            <Icon style={styles.iconActive} android='md-close' ios='ios-close' />
          </TouchableOpacity>
          : null
        }
      </TouchableOpacity>
    );
  }
}
