import React from 'react';
import { View, Linking } from 'react-native';
import { Text, Icon, Button } from 'native-base';

import Language from 'common/language';
import Image from 'common/image';

import { TRIP_DETAIL_STATUS } from 'constants/status';

import ClockIcon from 'assets/images/clock.png';
import SchoolIcon from 'assets/images/school.png';
import ParentsIcon from 'assets/images/parents.png';

import { styles, textStyles } from './route-item.style';

import Child from 'driver/main/pages/school-drive/components/child';

export default class RouteItem extends React.Component {
  handleOpenPhoneCall = () => {
    const { phone } = this.props.item.information;

    Linking.openURL(`tel:${phone}`);
  }

  handleNotify = () => {
    const { index, handleNotify } = this.props;

    handleNotify(index);
  }

  handleAchieve = childIndex => {
    const { index, handleChild, navigation, isGoingToSchool } = this.props;
    const newStatus = isGoingToSchool ? TRIP_DETAIL_STATUS.PICKED_UP : TRIP_DETAIL_STATUS.FINISHED;

    handleChild(index, childIndex, newStatus);
    navigation.goBack();
  }

  handleSkip = childIndex => {
    const { index, handleChild, navigation } = this.props;

    handleChild(index, childIndex, TRIP_DETAIL_STATUS.SKIPPED);
    navigation.goBack();
  }

  handleArriveSchool = () => {
    const { index, handleArriveSchool, navigation } = this.props;

    handleArriveSchool(index);
    navigation.goBack();
  }

  renderCustomer() {
    const {
      information: { name, avatar },
      address,
      children,
      achieved
    } = this.props.item;
    const { isGoingToSchool } = this.props;

    return (
      <React.Fragment>
        <View style={styles.customer}>
          <Image style={styles.avatar} defaultSource={ParentsIcon} src={avatar} resizeMode='cover' />
          <View style={styles.information}>
            <Text style={textStyles.name}>{name}</Text>
            <Text style={textStyles.address} numberOfLines={2}>{address}</Text>
          </View>
        </View>

        {children.map((child, index) =>
          <Child
            info={child}
            key={index}
            style={styles.child}
            isGoingToSchool={isGoingToSchool}
            handleAchieve={() => this.handleAchieve(index)}
            handleSkip={() => this.handleSkip(index)}
          />
        )}

        {achieved ? null :
          <View style={styles.action}>
            <Button bordered style={styles.button} onPress={this.handleNotify}>
              <Icon ios='ios-notifications' android="md-notifications" style={textStyles.button} />
              <Language style={textStyles.button}>NOTIFY</Language>
            </Button>
            <Button bordered style={styles.button} onPress={this.handleOpenPhoneCall}>
              <Icon ios='ios-call' android="md-call" style={textStyles.button} />
              <Language style={textStyles.button}>CALL</Language>
            </Button>
          </View>
        }
      </React.Fragment>
    );
  }

  renderSchool() {
    const { information: { name }, address, achieved } = this.props.item;

    return (
      <React.Fragment>
        <View style={styles.information}>
          <Text style={textStyles.name}>{name}</Text>
          <Text style={textStyles.address} numberOfLines={2}>{address}</Text>
        </View>

        <View style={styles.action}>
          {achieved ? null :
            <Button
              bordered
              style={styles.button}
              onPress={this.handleArriveSchool}
            >
              <Icon
                ios='ios-checkmark'
                android="md-checkmark"
                style={textStyles.button}
              />
              <Language style={textStyles.button}>ARRIVE</Language>
            </Button>
          }
        </View>
      </React.Fragment>
    );
  }

  render() {
    const { information: { type }, time, achieved } = this.props.item;
    const isSchool = type === 'school';

    return (
      <View style={styles.container}>
        <View style={styles.time}>
          {achieved
            ? <View style={styles.timeIcon} />
            : <Image style={styles.timeIcon} source={isSchool ? SchoolIcon : ClockIcon } resizeMode='cover' />}
          <Text style={textStyles.time}>{time}</Text>
        </View>

        <View style={{ ...styles.content, ...(achieved ? styles.achieved : null) }}>
          {isSchool ? this.renderSchool() : this.renderCustomer()}
        </View>
      </View>
    );
  }
}
