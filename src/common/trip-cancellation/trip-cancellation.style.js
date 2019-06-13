import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  dayoff: {
    padding: 20,
    paddingLeft: 40
    // alignItems: 'center'
  },
  dayoffPicker: {
    flexDirection: 'row',
    marginTop: 20
  },
  title: {
    alignSelf: 'center',
    color: THEME_COLOR
  },
  reason: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reasonTitle: {
    flex: 2
  },
  reasonPicker: {
    flex: 3
  },
  picker: {
    width: 200
  },
  otherReason: {
    padding: 20,
    marginTop: 20,
    flex: 1
  },
  button: {
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  }
});