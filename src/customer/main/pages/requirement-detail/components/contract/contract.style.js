import { StyleSheet } from 'react-native';
import { THEME_COLOR, PENDING_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  topContract: {
    flex: 1,
    backgroundColor: THEME_COLOR,
    flexDirection: 'row',
    paddingBottom: 20,
    height: 100
  },
  topContractPending: {
    flex: 1,
    backgroundColor: PENDING_COLOR,
    flexDirection: 'row',
    paddingBottom: 20,
    height: 100
  },
  topText: {
    color: 'white',
    fontSize: 13
  },
  topContractContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: -60
  },
  bottomContract: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 20
  },
  bottomContractContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContractText: {
    fontSize: 20
  },
  status: {
    fontSize: 16,
    fontStyle: 'italic',
    color: PENDING_COLOR
  },
  driverAddress: {
    fontSize: 15,
    fontStyle: 'italic',
    alignSelf: 'center'
  }
});