import { StyleSheet, Platform, StatusBar } from 'react-native';
import { THEME_COLOR } from 'constants/color';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  image: {
    minHeight: 200
  },
  container: {
    backgroundColor: '#00000066',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  header: {
    backgroundColor: 'transparent'
  },
  icon: {
    color: 'white'
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  address: {
    padding: 20,
    paddingRight: 40
  },
  addressContent: {
    flexDirection: 'row'
  }
});

export const textStyles = StyleSheet.create({
  key: {
    color: 'yellow',
    fontSize: 17,
    fontWeight: 'bold'
  },
  address: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
