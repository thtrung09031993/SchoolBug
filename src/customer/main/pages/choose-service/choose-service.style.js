import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE'
  },
  price: {
    margin: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2
  }
});

export const textStyles = StyleSheet.create({
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_COLOR
  },
  message: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#848484',
    alignSelf: 'center'
  }
});
