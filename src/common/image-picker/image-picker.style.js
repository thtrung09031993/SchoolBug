import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  dim: {
    flex: 6,
    backgroundColor: 'black',
    opacity: 0.6
  },
  imageSource: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row'
  },
  source: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  icon: {
    color: THEME_COLOR
  }
});