import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  content: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 6,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  line: {
    flex: 1,
    height: 20
  },
  destination: {
    paddingTop: 10
  },
  lineDecoration: {
    borderRightWidth: 2
  },
  icon: {
    width: 20,
    height: 20
  }
});