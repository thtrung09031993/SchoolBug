import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';
export const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: 250
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125
  },
  input: {
    marginTop: 2
  },
  row: {
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: THEME_COLOR
  },
  link: {
    color: THEME_COLOR
  },
  title: {
    color: THEME_COLOR
  },
  picker: {
    marginTop: 20
  }
});