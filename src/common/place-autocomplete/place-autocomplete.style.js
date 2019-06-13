import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  placeSuggestion: {
    flexDirection: 'row'
  },
  place: {
    flex: 3,
    flexWrap: 'wrap'
  },
  icon: {
    color: THEME_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  noPlace: {
    flex: 3,
    flexWrap: 'wrap',
    color: 'lightgrey',
    fontStyle: 'italic'
  }
});