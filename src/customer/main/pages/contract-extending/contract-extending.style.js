import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center'
  },
  title: {
    color: THEME_COLOR,
    fontWeight: 'bold'
  },
  datePicker: {
    width: 200,
    marginTop: 20
  },
  button: {
    alignSelf: 'center',
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    marginTop: 20
  }
});