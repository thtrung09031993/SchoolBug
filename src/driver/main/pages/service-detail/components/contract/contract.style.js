import { StyleSheet } from 'react-native';
import { THEME_COLOR, PENDING_COLOR, HISTORY_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 20,
    marginTop: 5,
    alignItems: 'stretch'
  },
  contractTitle: {
    alignSelf: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    color: 'lightgrey'
  },
  contract: {
    marginTop: 10,
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    // ios-only
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // android-only
    elevation: 2
  },
  info: {
    flexDirection: 'row',
    marginTop: 10
  },
  leftCol: {
    justifyContent: 'center'
  },
  rightCol: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 24
  },
  infoText: {
    fontSize: 15
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginLeft: 20
  },
  parent: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center'
  },
  parentLabel: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#666'
  },
  parentName: {
    fontWeight: 'bold',
    color: '#666'
  },
  phoneNumber: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#666'
  },
  status: {
    alignSelf: 'center',
    marginBottom: 10
  },
  statusText: {
    fontSize: 17,
    fontStyle: 'italic'
  },
  buttonAcceptionText: {
    color: '#64DD17'
  },
  buttonRejectionText: {
    color: '#FF1744'
  }
});

export const themeStyles = StyleSheet.create({
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