import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  grid: {
    width: 300,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: 130,
    height: 130,
    margin: 10,
    borderRadius: 26,
    backgroundColor: '#FFFFFFBB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 10
  }
});
