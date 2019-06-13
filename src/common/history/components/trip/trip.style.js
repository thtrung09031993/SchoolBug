import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  left: {
    flex: 1
  },
  right: {
    alignItems: 'flex-end'
  },
  icon: {
    color: THEME_COLOR,
    fontSize: 18
  },
  iconNotActive: {
    color: '#848484',
    fontSize: 18
  }
});

export const textStyles = StyleSheet.create({
  school: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242'
  },
  schoolNotActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#848484'
  },
  time: {
    color: '#424242',
    fontSize: 15
  },
  timeNotActive: {
    color: '#848484',
    fontSize: 15
  },
  status: {
    color: THEME_COLOR,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  statusNotActive: {
    color: '#848484',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
});
