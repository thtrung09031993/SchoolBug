import { StyleSheet } from 'react-native';
import { THEME_COLOR, PENDING_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingBottom: 30
  },
  icon: {
    alignSelf: 'center'
  },
  detailItem: {
    flexDirection: 'row',
    marginTop: 15
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
    alignItems: 'center'
  },
  pendingStatus: {
    color: '#f49e42'
  },
  cancelButton: {
    marginLeft: 10
  },
  cancelTrip: {
    color: 'red',
    fontSize: 25
  },
  extendingDate: {
    alignSelf: 'center'
  }
});

export const themeColorStyles = StyleSheet.create({
  active: {
    color: THEME_COLOR
  },
  pending: {
    color: PENDING_COLOR
  },
  history: {
    color: HISTORY_COLOR
  }
});