import React from 'react';
import { View, Button, Toast } from 'native-base';
import DatePicker from 'common/date-picker';
import Language, { formatLanguage } from 'common/language';
import { styles } from './contract-extending.style';
import API from 'common/api';
import { CONTRACT_EXTENDING_API, CONTRACT, REQUIREMENT } from 'constants/api';
import { getNextDay } from 'common/datetime-formatter';
import { RESPONSE_ERROR } from 'constants/common-data';

export default class ContractExtending extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('CONTRACT_EXTENDING')
  });

  constructor(props) {
    super(props);
    const endDate = props.navigation.getParam('endDate', null);

    this.state = {
      extendingDate: endDate ? getNextDay(endDate) : new Date()
    };
  }

  chooseExtendingDate = date => { this.setState({ extendingDate: date }); }

  extendContract = async () => {
    try {
      const { navigation } = this.props;
      const { extendingDate } = this.state;
      const contractID = navigation.getParam('contractID', '');

      await API.post(CONTRACT_EXTENDING_API, {
        [CONTRACT.CONTRACT_ID]: contractID,
        [REQUIREMENT.END_DATE]: extendingDate
      });

      Toast.show({
        text: formatLanguage('SEND_EXTEND_REQUEST'),
        buttonText: 'OK',
        type: 'success'
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'DRIVER_BUSY')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { extendingDate } = this.state;
    const { navigation } = this.props;
    const endDate = navigation.getParam('endDate', null);
    const minDate = endDate ? getNextDay(endDate) : new Date();

    return (
      <View style={styles.container}>
        <Language style={styles.title}>CHOOSE_EXTENDING_DATE</Language>
        <View style={styles.datePicker}>
          <DatePicker date={extendingDate} minimumDate={minDate}
            updateDate={date => this.chooseExtendingDate(date)} />
        </View>
        <Button onPress={this.extendContract} style={styles.button}>
          <Language>EXTEND</Language>
        </Button>
      </View>
    );
  }
}
