import { StyleSheet } from 'react-native';
import { THEME_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE'
  },
  add: {
    margin: 8,
    padding: 30,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#848484',
    alignItems: 'center'
  },
  addIcon: {
    fontSize: 60,
    color: '#848484'
  },
  headerRight: {
    paddingRight: 20
  },
  headerRightText: {
    color: THEME_COLOR
  }
});

export const textStyles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: THEME_COLOR,
    fontSize: 20,
    fontWeight: 'bold'
  },
  noRequirement: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: HISTORY_COLOR,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
