import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  marker: {
    width: 30,
    height: 30
  },
  vehicle: {
    width: 36,
    height: 36
  },
  locateButton: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 20,
    right: 20,
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },
  locateIcon: {
    color: THEME_COLOR
  }
});
