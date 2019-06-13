import { StyleSheet, Platform, StatusBar } from 'react-native';
import { THEME_COLOR, HISTORY_COLOR, PENDING_COLOR } from 'constants/color';
const NO_SPACE = 0;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME_COLOR,
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  historyHeader: {
    backgroundColor: HISTORY_COLOR,
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  pendingHeader: {
    backgroundColor: PENDING_COLOR,
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight
  },
  icon: {
    color: 'white'
  },
  title: {
    color: 'white'
  },
  historyTitle: {
    color: 'black'
  },
  left: {
    flex: 1
  },
  right: {
    flex: 1
  },
  body: {
    flex: 3,
    alignItems: 'center'
  }
});