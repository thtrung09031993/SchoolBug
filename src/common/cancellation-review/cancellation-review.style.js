import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  headerRight: {
    paddingRight: 20
  },
  headerRightText: {
    color: THEME_COLOR
  },
  title: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 20
  },
  dim: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  driverContainer: {
    backgroundColor: 'white',
    width: 350,
    height: 400,
    padding: 20,
    borderRadius: 20
  },
  driverItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightCol: {
    flex: 3,
    paddingLeft: 10,
    justifyContent: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center'
  },
  driverName: {
    marginLeft: 10
  },
  topName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    marginLeft: 20,
    alignSelf: 'center'
  },
  nameText: {
    fontWeight: 'bold'
  },
  icon: {
    color: THEME_COLOR
  }

});