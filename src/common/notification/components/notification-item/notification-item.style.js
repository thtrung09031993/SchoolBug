import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    marginLeft: 10,
    flex: 1
  },
  right: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start'
  },
  icon: {
    color: THEME_COLOR,
    fontSize: 30
  }
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242'
  },
  body: {
    color: '#424242',
    fontSize: 15
  },
  date: {
    color: '#848484',
    fontSize: 13,
    fontStyle: 'italic'
  },
  time: {
    color: '#848484',
    fontSize: 13,
    fontWeight: 'bold'
  }
});
