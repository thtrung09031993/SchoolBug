import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  icon: {
    color: '#ffd600',
    marginLeft: 10
  },
  time: {
    fontSize: 12
  },
  container: {
    alignItems: 'flex-start'
  },
  content: {
    flex: 2,
    alignItems: 'flex-start'
  },
  timeContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 8
  },
  overview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  nameAndScore: {
    marginLeft: 20
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  avgScore: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: 100,
    marginTop: 20,
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

export const scoreStyle = 20;