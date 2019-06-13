import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row'
  },
  achieved: {
    opacity: 0.5
  },
  time: {
    marginTop: 10,
    marginLeft: -40,
    marginRight: 10
  },
  timeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCC'
  },
  content: {
    flex: 1
  },
  customer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  child: {
    marginLeft: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  information: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  callIcon: {
    color: '#64DD17'
  },
  action: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
});

export const textStyles = StyleSheet.create({
  time: {
    backgroundColor: '#EEE'
  },
  name: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold'
  },
  address: {
    color: '#424242',
    fontSize: 16
  },
  button: {
    color: '#64DD17'
  }
});
