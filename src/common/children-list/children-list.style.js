import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 20
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginLeft: -20
  },
  name: {
    flex: 1,
    minWidth: 100,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#636363'
  }
});
