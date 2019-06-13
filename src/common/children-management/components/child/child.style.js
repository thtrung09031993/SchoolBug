import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2,
    width: 300
  },
  info: {
    flexDirection: 'row',
    marginTop: 10
  },
  leftCol: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightCol: {
    flex: 4,
    justifyContent: 'center'
  },
  icon: {
    color: THEME_COLOR
  },
  title: {
    color: THEME_COLOR
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  }
});