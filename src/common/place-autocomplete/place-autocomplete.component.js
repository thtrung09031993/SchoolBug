import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { styles } from './place-autocomplete.style';
import { PLACE_SUGGESTION } from 'constants/screen';
import Language from 'common/language';

export default class PlaceSuggestion extends React.Component {
  render() {

    const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.placeSuggestion}
        onPress={() => navigation.push(PLACE_SUGGESTION,
          { onChosenLocation: location => this.props.updatePlace(location) })}>
        <Language style={this.props.place === '' ? styles.noPlace : styles.place}>
            {this.props.place === ''
              ?
              'NO_PLACE'
              :
              this.props.place}
          </Language>
        <Icon name="pin" style={styles.icon} />
      </TouchableOpacity>
    );
  }
}