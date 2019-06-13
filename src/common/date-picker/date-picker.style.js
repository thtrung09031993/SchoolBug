import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';
export const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row'
  },
  date: {
    flex: 3,
    flexWrap: 'wrap'
  },
  icon: {
    flex: 1,
    color: THEME_COLOR,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  noDate: {
    flex: 3,
    flexWrap: 'wrap',
    color: 'lightgrey',
    fontStyle: 'italic'
  }
});