import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { View } from 'native-base';

import Language, { formatLanguage } from 'common/language';
import HomePage from 'common/home';

import { menus } from './home.util';
import { styles } from './home.style';

import { HISTORY } from 'constants/screen';
import { SERVICES, SERVICE_OPENING } from 'driver/constants/screen';

import ServiceIcon from 'assets/images/service.png';
import RegisterIcon from 'assets/images/register.png';
import OrdersIcon from 'assets/images/orders.png';

const GridItem = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.item}>
      <Image
        source={props.icon}
        style={styles.icon}
      />
      <Language style={{ textAlign: 'center', fontWeight: '500' }}>{props.title}</Language>
    </View>
  </TouchableOpacity>
);

export default class Home extends HomePage {
  getDrawerMenus = () => menus;

  renderChildren() {
    const { navigation } = this.props;

    return (
      <View style={styles.grid}>
        <GridItem
          icon={ServiceIcon}
          title={formatLanguage('SERVICES')}
          onPress={() => navigation.push(SERVICES)}
        />
        <GridItem
          icon={RegisterIcon}
          title={formatLanguage('OPEN_SERVICE')}
          onPress={() => navigation.push(SERVICE_OPENING)}
        />
        <GridItem
          icon={OrdersIcon}
          title={formatLanguage('HISTORY')}
          onPress={() => navigation.push(HISTORY)}
        />
      </View>
    );
  }
}
