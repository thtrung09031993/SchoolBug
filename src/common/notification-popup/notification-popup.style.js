import { StyleSheet, Platform, StatusBar } from 'react-native';

const NO_SPACE = 0;

export const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? NO_SPACE : StatusBar.currentHeight,
    zIndex: 5,
    top: 0,
    left: 0,
    right: 0
  },
  container: {
    padding: 20,
    maxHeight: 90,
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  content: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
  },
  body: {
    fontSize: 14
  }
});
