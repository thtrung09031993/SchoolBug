import { StyleSheet } from 'react-native';
import { THEME_COLOR, PENDING_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f9f7f7'
  },
  content: {
    marginTop: 5,
    flexDirection: 'row'
  },
  title: {
    color: THEME_COLOR
  }
});

export const themeStyle = StyleSheet.create({
  active: {
    color: THEME_COLOR
  },
  pending: {
    color: PENDING_COLOR
  },
  negative: {
    color: HISTORY_COLOR
  }
});