import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { View } from 'native-base';

import Language, { formatLanguage } from 'common/language';
import HomePage from 'common/home';

import { menus } from './home.util';
import { styles } from './home.style';

import { CHILDREN_MANAGEMENT, HISTORY } from 'constants/screen';
import { SERVICE_REQUIREMENT, REQUIREMENTS } from 'customer/constants/screen';

import ServiceIcon from 'assets/images/service.png';
import RegisterIcon from 'assets/images/register.png';
import ChildrenIcon from 'assets/images/children.png';
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
          title={formatLanguage('REQUIREMENT')}
          onPress={() => navigation.push(REQUIREMENTS)}
        />
        <GridItem
          icon={RegisterIcon}
          title={formatLanguage('CREATE_REQUIREMENT')}
          onPress={() => navigation.push(SERVICE_REQUIREMENT)}
        />
        <GridItem
          icon={ChildrenIcon}
          title={formatLanguage('MY_CHILDREN')}
          onPress={() => navigation.push(CHILDREN_MANAGEMENT)}
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
