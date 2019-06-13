import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    margin: 12,
    padding: 12,
    backgroundColor: '#FFF',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2
  },
  action: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  buttonActive: {
    flex: 1,
    borderColor: '#64DD17',
    justifyContent: 'center',
    backgroundColor: '#64DD17'
  }
});

export const textStyles = StyleSheet.create({
  button: {
    color: '#64DD17'
  },
  buttonActive: {
    color: '#FFFFFF'
  }
});
