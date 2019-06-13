import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  dim: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.6
  },
  options: {
    backgroundColor: 'white'
  },
  option: {
    flexDirection: 'row'
  },
  optionTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionContent: {
    flex: 5,
    justifyContent: 'center',
    padding: 20
  },
  updateOption: {
    color: THEME_COLOR
  },
  deleteOption: {
    color: 'red'
  },
  fabButton: {
    backgroundColor: THEME_COLOR
  },
  icon: {
    color: THEME_COLOR,
    fontSize: 50
  },
  buttonAddChild: {
    margin: 10,
    padding: 20,
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2,
    width: 300,
    borderStyle: 'dashed',
    borderWidth: 3,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  }
});