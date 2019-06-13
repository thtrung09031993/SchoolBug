import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';

import Image from 'common/image';
import Language from 'common/language';

import { TRIP_DETAIL_STATUS } from 'constants/status';
import { formatCurrency } from 'utils/currency';

import { styles, textStyles } from './detail.style';

export default class Detail extends React.Component {
  render() {
    const { icon, isCancelled, information: { avatar, name, time, fee, address, status } = {} } = this.props;
    const active = status !== TRIP_DETAIL_STATUS.CANCELLED && status !== TRIP_DETAIL_STATUS.SKIPPED;

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {active && !isCancelled
            ? <React.Fragment>
                <Image style={styles.icon} source={icon} resizeMode='cover' />
                <Text style={textStyles.time} numberOfLines={1}>{time}</Text>
              </React.Fragment>
            : <View style={styles.icon} />
          }
        </View>
        <View style={active ? styles.right : styles.rightNotActive}>
          <Image style={avatar ? styles.avatar : styles.noAvatar} src={avatar} resizeMode='cover' />
          <View style={styles.information}>
            <Text style={textStyles.name}>{name}</Text>
            <Text style={textStyles.address} numberOfLines={2}>{address}</Text>
          </View>
          <Language style={textStyles.price}>{active ? formatCurrency(fee) : status}</Language>
        </View>
      </View>
    );
  }
}
