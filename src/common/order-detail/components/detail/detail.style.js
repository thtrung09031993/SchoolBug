import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  left: {
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#CCC'
  },
  right: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightNotActive: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25
  },
  noAvatar: {
    width: 50,
    height: 0,
    marginRight: 10
  },
  information: {
    flex: 1
  }
});

export const textStyles = StyleSheet.create({
  time: {
    fontSize: 14,
    color: '#636363',
    backgroundColor: '#FFFFFF'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15
  },
  address: {
    fontSize: 14,
    color: '#636363'
  },
  price: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold'
  }
});
