import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Icon } from 'native-base';
import { styles } from './no-children-handler.style';
import Language from 'common/language';
import { CHILD_REGISTRATION } from 'constants/screen';

export default class NoChildrenHandler extends React.Component {

  goToAddChild = () => {
    const { navigation } = this.props;

    navigation.push(CHILD_REGISTRATION);
  }

  render() {
    return (
      <View style={styles.container}>
        <Language style={styles.title}>NO_CHILDREN</Language>
        <TouchableOpacity onPress={this.goToAddChild} style={styles.button}>
          <Icon style={styles.icon} name="person-add" />
        </TouchableOpacity>
      </View>
    );
  }
}
