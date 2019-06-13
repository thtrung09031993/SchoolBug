import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Content, Text, Icon } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import { AUTHORIZATION, PROFILE_UPDATING } from 'constants/screen';
import { removeToken } from 'utils/storage';
import { unregisterDevice } from 'utils/notifications';
import { Rating } from 'react-native-ratings';
import { RATING } from 'constants/common-data';

import { styles, textStyles, starStyle } from './sidebar.style';
import { formatLanguage } from 'common/language';
import Image from 'common/image';

export default class SideBar extends React.Component {
  handleLogout = () => {
    Alert.alert(
      formatLanguage('LOG_OUT'),
      formatLanguage('LOG_OUT_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.logout }
      ],
      { cancelable: true },
    );
  }

  logout = () => {
    const { navigation, resetUserStore } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: AUTHORIZATION })
      ]
    });

    removeToken();
    unregisterDevice();
    resetUserStore();
    navigation.dispatch(resetAction);
  }

  goToProfileUpdating = () => {
    const { navigation } = this.props;

    navigation.push(PROFILE_UPDATING, {
      isUpdatingProfileAgain: true
    });
  }

  render() {
    const { menus, appType, user } = this.props;

    return (
      <Content style={styles.sidebar}>
        <View style={styles.profile}>
          <View style={styles.leftCol}>
            <TouchableOpacity onPress={this.goToProfileUpdating}>
              <Image style={styles.avatar} src={user.avatar} resizeMode='cover' />
            </TouchableOpacity>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.name}>{user.name}</Text>
            {
              appType === 'driver'
                ?
                <View style={styles.score}>
                  <Rating
                    ratingCount={5}
                    readonly
                    startingValue={user.score}
                    imageSize={starStyle}
                    fractions={2}
                  />
                </View>
                :
                <Text></Text>
            }
          </View>
        </View>
        {menus.map((block, index) => (
          <View style={styles.block} key={index}>

            {block.map((item, itemIndex) => (
              <TouchableOpacity
                style={styles.row}
                key={itemIndex}
                onPress={item.title === 'LOG_OUT'
                  ? this.handleLogout
                  : () => this.props.navigation[item.action](item.page, item.params)
                }
              >
                <View style={styles.iconContainer}>
                  <Icon style={styles.icon} name={item.icon} />
                </View>

                <View style={styles.menuItem}>
                  <Text style={textStyles.menuItem}>{formatLanguage(item.title)}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </View>
        ))}
      </Content>
    );
  }
}
