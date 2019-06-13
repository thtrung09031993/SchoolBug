import { StyleSheet, Platform, StatusBar } from 'react-native';

import { THEME_COLOR } from 'constants/color';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  left: {

  },
  right: {
    alignItems: 'flex-end'
  },
  driver: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  information: {

  },
  detail: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
  detailContainer: {

  },
  timeline: {
    position: 'absolute',
    top: 12,
    bottom: -12,
    left: 10,
    width: 0,
    borderWidth: 2,
    borderColor: '#CCC'
  },
  total: {
    borderTopWidth: 1,
    borderColor: '#CCC',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footer: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF'
  },
  button: {
    marginBottom: 20,
    borderColor: THEME_COLOR
  }
});

export const textStyles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24
  },
  time: {
    fontSize: 14
  },
  tripID: {
    fontSize: 14
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  phone: {
    fontSize: 15,
    color: '#636363'
  },
  plateNumber: {
    fontSize: 15,
    color: '#636363'
  },
  detail: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#636363',
    marginBottom: 10
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  button: {
    color: THEME_COLOR
  }
});
