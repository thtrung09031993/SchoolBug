import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  picker: {
    width: 400,
    marginTop: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  otherReason: {
    padding: 20,
    marginTop: 20,
    flex: 1
  },
  button: {
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  title: {
    color: THEME_COLOR,
    alignSelf: 'center'
  }
});
