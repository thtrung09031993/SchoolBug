import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    color: THEME_COLOR
  },
  childrenList: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    padding: 20
  },
  child: {
    marginLeft: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40
  }
});

export const toggleStyles = StyleSheet.create({
  chosenText: {
    color: THEME_COLOR
  },
  notChosenText: {
    color: 'black'
  },
  chosenImage: {
    borderWidth: 5,
    borderColor: THEME_COLOR,
    opacity: 0.7
  },
  notChosenImage: {
    opacity: 1
  }
});