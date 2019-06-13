import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Text } from 'native-base';
import DefaultSchool from 'assets/images/defaultSchool.jpg';

import Language from 'common/language';
import { SERVICES } from 'driver/constants/screen';

import { textStyles, styles } from './navigation-bar.style';

export default class NavigationBar extends React.Component {
  handleGoBack = () => {
    this.props.navigation.navigate(SERVICES);
  }

  render() {
    const { handleGoBack, handleOptions, imageUrl, startAddress, stopAddress, isNotAvailable } = this.props;

    return (
      <ImageBackground source={imageUrl ? { uri: imageUrl } : DefaultSchool } style={styles.image}>
        <View style={styles.container}>
          <Header style={styles.header} hasTabs>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={handleGoBack}>
                <Icon style={styles.icon} name='arrow-round-back' />
              </Button>
            </Left>
            <Body style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Language style={styles.appName}>SERVICE_DETAIL</Language>
            </Body>
            <Right style={{ flex: 1 }}>
              {
                isNotAvailable
                  ?
                  null
                  :
                  <Button transparent onPress={handleOptions}>
                    <Icon style={styles.icon} name='more' />
                  </Button>
              }
            </Right>
          </Header>

          <View style={styles.address}>
            <View style={styles.addressContent}>
              <Language style={textStyles.key}>FROM: </Language>
              <Text style={textStyles.address}>{startAddress}</Text>
            </View>
            <View style={styles.addressContent}>
              <Language style={textStyles.key}>TO: </Language>
              <Text style={textStyles.address}>{stopAddress}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
