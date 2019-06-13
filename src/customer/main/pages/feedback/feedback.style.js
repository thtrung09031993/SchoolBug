import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20
  },
  driver: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  leftCol: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  rightCol: {
    flex: 5,
    justifyContent: 'center',
    paddingLeft: 20
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  name: {
    fontWeight: 'bold'
  },
  rating: {
    marginTop: 20,
    backgroundColor: THEME_COLOR,
    padding: 40
  },
  content: {
    marginTop: 30,
    flex: 1
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: THEME_COLOR
  }
});

export const ratingSize = 50;