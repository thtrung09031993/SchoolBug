import React from 'react';
import { View, Button } from 'native-base';
import Language from 'common/language';
import { styles } from './no-contract.style';

export default class NoContract extends React.Component {
  render() {
    const { handleFindDriver } = this.props;

    return (
      <View style={styles.container}>
        <Language style={styles.text}>NO_CONTRACT</Language>
        <Button onPress={handleFindDriver} style={styles.button}>
          <Language>FIND_NOW</Language>
        </Button>
      </View>
    );
  }
}
