import { StyleSheet } from 'react-native';

import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2
  },
  header: {
    alignItems: 'center',
    marginBottom: 10
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  information: {
    width: 300
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  icon: {
    color: THEME_COLOR,
    marginRight: 30,
    fontSize: 20
  },
  action: {
    width: 300
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    marginTop: 10
  },
  score: {
    alignSelf: 'center',
    marginTop: 10
  }
});

export const textStyles = StyleSheet.create({
  name: {
    color: '#424242',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  information: {
    color: '#424242',
    fontSize: 18
  },
  missing: {
    color: '#F44336',
    fontSize: 16,
    fontStyle: 'italic'
  },
  button: {
    color: THEME_COLOR,
    fontSize: 18
  }
});

export const starStyle = 20;