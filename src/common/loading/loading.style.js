import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 3
  }
});
