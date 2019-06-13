import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

import Image from 'common/image';
import Language, { formatLanguage } from 'common/language';

import { DAYS_OF_WEEK, ONE } from 'constants/common-data';

import { styles, textStyles, themeColorStyles } from './requirement-item.style';

export default class RequirementItem extends React.Component {
  render() {
    const { id, children, school, daysOfWeek,
      pickUpTime, driver, handleChooseService, isHistory, contractStatus } = this.props;

    let themeStyle = {};

    if (isHistory) {
      themeStyle = themeColorStyles.history;
    } else {
      themeStyle = contractStatus && contractStatus === 'ACTIVE' ? themeColorStyles.active : themeColorStyles.pending;
    }

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleChooseService(id)}
      >
        <View style={styles.peopleInfo}>
          <View style={driver ? styles.childrenColumn : styles.childrenRow}>
            {children.map((child, index) =>
              <View key={index} style={(!driver || children.length === ONE) ? styles.childColumn : styles.childRow}>
                <Image style={styles.childAvatar} src={child.avatar} resizeMode='cover' />
                <Text style={
                  (!driver || children.length === ONE)
                    ? textStyles.childNameColumn
                    : textStyles.childNameRow
                }>{child.name}</Text>
              </View>
            )}
          </View>
          {driver
            ? <View style={styles.driver}>
              <Image style={styles.driverAvatar} src={driver.avatar} resizeMode='cover' />
              <View style={styles.driverName}>
                <Icon style={{ ...textStyles.driverIcon, ...themeStyle }} ios='ios-car' android='md-car' />
                <Language style={textStyles.driverIcon}> DRIVER </Language>
                <Text style={textStyles.driverName}>{driver.name}</Text>
                {
                  contractStatus && contractStatus === 'PENDING'
                    ? <Language style={themeStyle}>( PENDING)</Language>
                    : null
                }
              </View>
            </View>
            : null
          }
        </View>

        <View style={styles.information}>
          <View style={styles.row}>
            <Icon ios='ios-school' android="md-school" style={{ ...styles.icon, ...themeStyle }} />
            <Text style={textStyles.information}>{school.name}</Text>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-time' android="md-time" style={{ ...styles.icon, ...themeStyle }} />
            <Language style={textStyles.information}>{pickUpTime}</Language>
          </View>
          <View style={styles.row}>
            <Icon ios='ios-calendar' android="md-calendar" style={{ ...styles.icon, ...themeStyle }} />
            <Language style={textStyles.information}>
              {daysOfWeek.map(day => formatLanguage(DAYS_OF_WEEK[day])).join(', ')}
            </Language>
          </View>
        </View>

        {isHistory || driver
          ? null
          : <Language style={{ ...textStyles.status, ...themeStyle }}>DRIVER_NOT_AVAILABLE</Language>
        }
      </TouchableOpacity>
    );
  }
}
