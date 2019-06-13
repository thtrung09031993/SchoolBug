import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#fff',
    flex: 1
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  leftCol: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20
  },
  rightCol: {
    flex: 5,
    justifyContent: 'center',
    paddingTop: 15,
    paddingLeft: 20
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  name: {
    fontWeight: 'bold'
  },
  score: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreIcon: {
    color: '#ffd600',
    marginLeft: 5
  },
  block: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 12
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingBottom: 12,
    paddingTop: 12
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  icon: {
    color: '#616161'
  },
  menuItem: {
    flex: 5,
    justifyContent: 'center'
  }
});

export const textStyles = StyleSheet.create({
  menuItem: {
    fontWeight: '500'
  }
});

export const starStyle = 20;
