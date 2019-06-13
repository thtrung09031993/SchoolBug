import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';

import Language, { formatLanguage } from 'common/language';
import Image from 'common/image';

import { TRIP_STATUS } from 'constants/status';

import { styles, textStyles } from './trip.style';

import Home from 'assets/images/house-big.png';
import School from 'assets/images/school-big.png';
import SchoolGray from 'assets/images/school-grayscale.png';

export default class Trip extends React.Component {
  handleChooseTrip = () => {
    const { tripID, driverServiceID, status, handleChooseTrip } = this.props;

    if (status === TRIP_STATUS.GOING) {
      handleChooseTrip(driverServiceID, status);
    } else {
      handleChooseTrip(tripID, status);
    }
  }

  render() {
    const { school, date, startTime, endTime, status, type } = this.props;
    const timeMessage = startTime ? ` ${startTime} - ${endTime ? endTime : formatLanguage('NOW')}` : null;
    const isCancelled = status === TRIP_STATUS.CANCELLED;
    let image = null;

    if (isCancelled) {
      image = SchoolGray;
    } else {
      image = type === 'GO_TO_SCHOOL' ? School : Home;
    }

    return (
      <TouchableOpacity style={styles.container} onPress={this.handleChooseTrip}>
        <Image style={styles.image} source={image} resizeMode='contain' />
        <View style={styles.left}>
          <Text style={isCancelled ? textStyles.schoolNotActive : textStyles.school}>{school}</Text>
          {timeMessage &&
            <Text style={isCancelled ? textStyles.timeNotActive : textStyles.time}>
              <Icon style={isCancelled ? styles.iconNotActive : styles.icon} android='md-time' ios='md-time' />
              {timeMessage}
            </Text>
          }
        </View>
        <View style={styles.right}>
          <Text style={isCancelled ? textStyles.timeNotActive : textStyles.time}>{date}</Text>
          <Language style={isCancelled ? textStyles.statusNotActive : textStyles.status}>{status}</Language>
        </View>
      </TouchableOpacity>
    );
  }
}
