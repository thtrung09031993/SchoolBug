import React from 'react';
import { View, Text } from 'native-base';
import Image from 'common/image';
import { styles } from './trip.style';
import House from 'assets/images/house.png';
import School from 'assets/images/school.png';

export default class Trip extends React.Component {
  render() {
    const { from, to, theme } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Image source={House} resizeMode='cover' style={styles.icon} />
          </View>
          <View style={styles.right}>
            <Text>{from}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.left}>
            <View style={{ ...styles.line, ...styles.lineDecoration, ...{ borderRightColor: theme.color } }}></View>
          </View>
          <View style={styles.right}></View>
        </View>
        <View style={{ ...styles.content, ...styles.destination }}>
          <View style={styles.left}>
            <Image source={School} resizeMode='cover' style={styles.icon} />
          </View>
          <View style={styles.right}>
            <Text>{to}</Text>
          </View>
        </View>
      </View>
    );
  }
}
