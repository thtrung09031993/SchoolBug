import { StyleSheet, Platform, StatusBar } from 'react-native';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    minHeight: 30,
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  icon: {
    color: 'white'
  },
  appName: {
    fontSize: 30,
    fontFamily: "Pacifico",
    color: 'white',
    alignSelf: 'center'
  }
});
