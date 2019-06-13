import { StyleSheet } from 'react-native';

const button = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 30,
  height: 30,
  borderWidth: 1,
  borderRadius: 15,
  margin: 8
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingTop: 6,
    paddingBottom: 6
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  information: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  buttonAchieve: {
    ...button,
    borderColor: '#64DD17'
  },
  buttonAchieveActive: {
    ...button,
    borderColor: '#64DD17',
    backgroundColor: '#64DD17'
  },
  buttonSkip: {
    ...button,
    borderColor: '#FF1744'
  },
  buttonSkipActive: {
    ...button,
    borderColor: '#FF1744',
    backgroundColor: '#FF1744'
  },
  iconAchieve: {
    color: '#64DD17',
    fontSize: 18
  },
  iconSkip: {
    color: '#FF1744',
    fontSize: 18
  },
  iconActive: {
    color: '#FFFFFF',
    fontSize: 18
  }
});

export const textStyles = StyleSheet.create({
  name: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold'
  },
  description: {
    color: '#424242',
    fontSize: 14
  }
});
