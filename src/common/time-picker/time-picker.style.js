import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';
export const styles = StyleSheet.create({
  timePicker: {
    flexDirection: 'row'
  },
  time: {
    flex: 3,
    flexWrap: 'wrap'
  },
  icon: {
    flex: 1,
    color: THEME_COLOR,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  noTime: {
    flex: 3,
    flexWrap: 'wrap',
    color: 'lightgrey',
    fontStyle: 'italic'
  }
});