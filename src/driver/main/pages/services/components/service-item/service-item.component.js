import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, Button } from 'native-base';

import Language, { formatLanguage } from 'common/language';

import { DAYS_OF_WEEK } from 'constants/common-data';

import { styles, textStyles, themeColorStyles } from './service-item.style';

export default class ServiceItem extends React.Component {
  render() {
    const {
      id,
      school,
      daysOfWeek,
      startTime,
      returnTime,
      numberOfCustomers,
      capacityAvailable,
      handleStartTrip,
      handleChooseService,
      isHistory
    } = this.props;

    const themeStyle = isHistory ? themeColorStyles.history : themeColorStyles.active;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleChooseService(id)}
      >
        <View style={styles.information}>
          <View style={styles.row}>
            <Icon ios='ios-school' android="md-school" style={{ ...styles.icon, ...themeStyle }} />
            <Text style={textStyles.information}>{school.name}</Text>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-time' android="md-time" style={{ ...styles.icon, ...themeStyle }} />
            <View>
              <Language style={textStyles.information}>GOING_TRIP: {startTime}</Language>
              <Language style={textStyles.information}>RETURN_TRIP: {returnTime}</Language>
            </View>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-calendar' android="md-calendar" style={{ ...styles.icon, ...themeStyle }} />
            <Language style={textStyles.information}>
              {daysOfWeek.map(day => formatLanguage(DAYS_OF_WEEK[day])).join(', ')}
            </Language>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-people' android="md-people" style={{ ...styles.icon, ...themeStyle }} />
            <Language style={textStyles.information}>
              AVAILABLE_SEAT: {capacityAvailable - numberOfCustomers}/{capacityAvailable}
            </Language>
          </View>
        </View>
        <View style={styles.action}>
          {numberOfCustomers
            ? <Button block bordered style={styles.button} onPress={() => handleStartTrip(id)}>
              <Icon ios='ios-paper-plane' android='md-paper-plane' style={{ ...styles.icon, ...themeStyle }} />
              <Language style={textStyles.button}>START_TRIP</Language>
            </Button>
            : null}
        </View>
      </TouchableOpacity>
    );
  }
}
