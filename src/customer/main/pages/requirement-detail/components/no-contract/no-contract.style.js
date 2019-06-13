import { StyleSheet } from 'react-native';
import { THEME_COLOR, PENDING_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    color: 'grey',
    fontStyle: 'italic'
  },
  button: {
    marginTop: 20,
    backgroundColor: PENDING_COLOR,
    alignItems: 'center',
    alignSelf: 'center'
  }
});