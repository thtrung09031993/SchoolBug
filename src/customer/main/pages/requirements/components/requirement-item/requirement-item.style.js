import { StyleSheet } from 'react-native';

import { THEME_COLOR, PENDING_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 40,
    paddingTop: 20,
    paddingBottom: 5,
    alignItems: 'center',
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
  peopleInfo: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minWidth: 300
  },
  childrenRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  childrenColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  childColumn: {
    alignItems: 'center',
    marginRight: 10
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  childAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  driver: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#CCCCCC'
  },
  driverName: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  driverAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  information: {
    marginTop: 10,
    width: 300
  },
  row: {
    flexDirection: 'row',
    margin: 5
  },
  icon: {
    marginRight: 30,
    fontSize: 20
  }
});

export const textStyles = StyleSheet.create({
  driverIcon: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  childNameColumn: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
    margin: 5
  },
  childNameRow: {
    color: '#424242',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    margin: 5
  },
  driverName: {
    color: '#424242',
    fontSize: 17,
    fontWeight: '600'
  },
  information: {
    color: '#424242',
    flex: 1,
    fontSize: 18
  },
  status: {
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
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