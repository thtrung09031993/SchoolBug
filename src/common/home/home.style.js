import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: -Header.HEIGHT - (Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight),
    paddingTop: Header.HEIGHT + (Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight)
  }
});
