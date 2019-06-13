import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: 250
  },
  input: {
    marginTop: 2
  },
  row: {
    marginTop: 20,
    alignItems: 'center'
  },
  picker: {
    marginTop: 20
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: THEME_COLOR
  }
});