import { StyleSheet } from 'react-native';

import { THEME_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 20,
    paddingBottom: 5,
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC'
    // borderRadius: 20,
    // // ios-only
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // // android-only
    // elevation: 2
  },
  information: {
    width: 320,
    alignSelf: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  icon: {
    fontSize: 20
  },
  action: {
    width: 300,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    marginTop: 5
  }
});

export const textStyles = StyleSheet.create({
  information: {
    marginLeft: 30,
    color: '#424242',
    fontSize: 18
  },
  button: {
    color: THEME_COLOR,
    fontSize: 18
  }
});

export const themeColorStyles = StyleSheet.create({
  active: {
    color: THEME_COLOR
  },
  history: {
    color: HISTORY_COLOR
  }
});
