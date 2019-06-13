import React from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import { Rating } from 'react-native-ratings';

import Image from 'common/image';
import Language, { formatLanguage } from 'common/language';

import { DAYS_OF_WEEK } from 'constants/common-data';

import { styles, textStyles, starStyle } from './driver-service.style';

export default class DriveService extends React.Component {
  render() {
    const { driver, car, missingTrip, driverServiceID, handleChooseService, offDay } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} src={driver.avatar} resizeMode='cover' />
          <Text style={textStyles.name}>{driver.name}</Text>
        </View>

        <View style={styles.information}>
          <View style={styles.row}>
            <Icon ios='ios-call' android="md-call" style={styles.icon} />
            <Text style={textStyles.information}>{driver.phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-car' android="md-car" style={styles.icon} />
            <Language style={textStyles.information}>
              {car.brand} {car.model} {car.color} {car.capacity} SLOTS
            </Language>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-filling' android="md-browsers" style={styles.icon} />
            <Language style={textStyles.information}>
              PLATE_NUMBER {car.plateNo}
            </Language>
          </View>
          <View style={styles.score}>
            <Rating
              ratingCount={5}
              readonly
              startingValue={driver.score}
              imageSize={starStyle}
              fractions={2}
            />
          </View>
          {missingTrip.length ?
            <View style={styles.row}>
              <Icon ios='ios-calendar' android="md-calendar" style={styles.icon} />
              <Language style={textStyles.missing}>
                NOT_AVAILABLE_ON {missingTrip.map(day => formatLanguage(DAYS_OF_WEEK[day])).join(', ')}
              </Language>
            </View>
            : null}
        </View>

        <View style={styles.action}>
          <Button block bordered style={styles.button} onPress={() => handleChooseService(driverServiceID)}>
            <Language style={textStyles.button}>
              {
                offDay ? 'CHOOSE_ALTERNATIVE_SERVICE' : 'CHOOSE_SERVICE'
              }
            </Language>
          </Button>
        </View>
      </View>
    );
  }
}
