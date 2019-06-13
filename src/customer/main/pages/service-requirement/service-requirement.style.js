import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  registerItem: {
    flexDirection: 'row',
    marginTop: 20
  },
  daysOfWeekTitle: {
    alignSelf: 'center',
    marginBottom: 10
  },
  leftCol: {
    flex: 5,
    justifyContent: 'center',
    borderRightWidth: 0.5,
    paddingLeft: 10
  },
  rightCol: {
    flex: 7,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  information: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: '#999999',
    paddingBottom: 10
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  priceText: {
    color: '#424242',
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    alignSelf: 'center',
    borderRadius: 30
  }
});