import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: -Header.HEIGHT - (Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight),
    paddingTop: Header.HEIGHT + (Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight)
  },
  grid: {
    width: 300,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: 130,
    height: 130,
    margin: 10,
    borderRadius: 26,
    backgroundColor: '#FFFFFFBB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 10
  }
});
