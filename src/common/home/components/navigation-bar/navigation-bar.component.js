import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { NOTIFICATION } from 'constants/screen';

import { styles } from './navigation-bar.style';

export default class NavigationBar extends React.Component {
  render() {
    const { handleOpenDrawer, handleHomePress, navigation } = this.props;

    return (
      <Header style={styles.header} hasTabs>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={handleOpenDrawer}>
            <Icon style={styles.icon} name='menu' />
          </Button>
        </Left>
        <Body style={{ flex: 3, justifyContent: 'center', alignItems: 'stretch' }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={handleHomePress}>
            <Title style={styles.appName}>School Bus</Title>
          </TouchableOpacity>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.push(NOTIFICATION)}>
            <Icon style={styles.icon} name='notifications' />
          </Button>
        </Right>
      </Header>
    );
  }
}
