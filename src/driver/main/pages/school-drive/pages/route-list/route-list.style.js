import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#EEE'
  },
  list: {
    position: 'relative'
  },
  timeline: {
    position: 'absolute',
    top: 50,
    bottom: -40,
    left: 13,
    width: 0,
    borderColor: '#CCC',
    borderLeftWidth: 4,
    borderStyle: 'dotted'
  },
  button: {
    marginTop: 15,
    marginLeft: 40,
    borderColor: '#64DD17',
    backgroundColor: '#FFFFFF'
  }
});

export const textStyles = StyleSheet.create({
  button: {
    color: '#64DD17'
  }
});
