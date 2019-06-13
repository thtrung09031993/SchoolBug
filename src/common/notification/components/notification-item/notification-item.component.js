import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';

import Language from 'common/language';

import { styles, textStyles } from './notification-item.style';

export default class NotificationItem extends React.Component {
  render() {
    const { title, body, date, time, handlePress } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Icon style={styles.icon} android='md-mail' ios='md-mail' />
        <View style={styles.left}>
          <Language style={textStyles.title}>{title}</Language>
          <Language style={textStyles.body}>{body}</Language>
        </View>
        <View style={styles.right}>
          <Text style={textStyles.date}>{date}</Text>
          <Text style={textStyles.time}>{time}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
