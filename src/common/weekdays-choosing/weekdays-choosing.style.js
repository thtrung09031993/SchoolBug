import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 5
  },
  button: {
    flex: 1,
    marginLeft: 2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  day: {
    fontSize: 11,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

export const toggleStyles = StyleSheet.create({
  chosenText: {
    color: 'white'
  },
  notChosenText: {
    color: 'grey'
  },
  chosenButton: {
    backgroundColor: THEME_COLOR
  },
  notChosenButton: {
    backgroundColor: 'white'
  }
});