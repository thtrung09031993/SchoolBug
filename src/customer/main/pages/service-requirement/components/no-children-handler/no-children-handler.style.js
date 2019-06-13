import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderColor: 'lightgrey',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: THEME_COLOR,
    fontSize: 40
  },
  title: {
    color: 'grey'
  }
});