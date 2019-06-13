import { StyleSheet } from 'react-native';

import { THEME_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 48
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
  splitStyle: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5
  },
  updateOption: {
    color: THEME_COLOR
  },
  deleteOption: {
    color: 'red'
  },
  viewOption: {
    color: '#f49b42'
  },
  icon: {
    alignSelf: 'center'
  },
  detailItem: {
    flexDirection: 'row',
    marginTop: 20
  },
  leftCol: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightCol: {
    flex: 6,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 5
  },
  contract: {
    marginTop: 20
  },
  contractTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#666'
  },
  bottomTabsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'stretch',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 3
  },
  bottomTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabTextActive: {
    color: THEME_COLOR,
    fontWeight: 'bold'
  },
  tabTextInactive: {
    color: '#999'
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