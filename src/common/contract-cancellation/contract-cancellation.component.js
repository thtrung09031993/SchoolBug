import React from 'react';
import { Picker, Button, Textarea, Content, Toast } from 'native-base';
import { Alert } from 'react-native';
import { styles } from './contract-cancellation.style';
import { CANCEL_CONTRACT_REASON, ARRAY_STEP, ARRAY_FIRST, EMPTY_STRING } from 'constants/common-data';
import { CONTRACT, CONTRACT_API } from 'constants/api';
import API from 'common/api';
import Language, { formatLanguage } from 'common/language';

export default class ContractCancellation extends React.Component {

  static navigationOptions = () => ({
    title: formatLanguage('CONTRACT_CANCELLATION')
  });

  constructor(props) {
    super(props);

    this.state = {
      description: ARRAY_FIRST,
      otherReason: {
        isVisible: false,
        content: ''
      }
    };
  }

  handleAnotherReason = reason => {
    this.setState(prevState => ({
      otherReason: {
        isVisible: prevState.otherReason.isVisible,
        content: reason
      }
    }));
  }

  handlePicker = value => {
    const { screenProps: { appType } } = this.props;

    value === CANCEL_CONTRACT_REASON[appType].length - ARRAY_STEP
      ?
      this.setState({ description: value, otherReason: { isVisible: true, content: '' } })
      :
      this.setState({ description: value, otherReason: { isVisible: false, content: '' } });
  }

  isValidated = () => {
    const cancelRequest = this.state;

    if (cancelRequest.otherReason.isVisible &&
      cancelRequest.otherReason.content.length === EMPTY_STRING) {
      return false;
    }

    return true;
  }

  handleCancelContract = () => {
    if (this.isValidated()) {
      Alert.alert(
        formatLanguage('CANCEL_CONTRACT_TITLE'),
        formatLanguage('CANCEL_CONTRACT_QUESTION'),
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'OK', onPress: this.cancelContract }
        ],
        { cancelable: true },
      );
    } else {
      Toast.show({
        text: formatLanguage('FIELDS_WARNING'),
        buttonText: 'OK',
        type: 'warning'
      });
    }
  }

  cancelContract = async () => {
    try {
      const { navigation, screenProps: { appType } } = this.props;
      const cancelRequest = this.state;

      await API.delete(CONTRACT_API, { [CONTRACT.CONTRACT_ID]: navigation.getParam('contractID', null) }, {
        body: JSON.stringify({
          [CONTRACT.DESCRIPTION]: cancelRequest.description === CANCEL_CONTRACT_REASON[appType].length - ARRAY_STEP
            ?
            cancelRequest.otherReason.content
            :
            formatLanguage(CANCEL_CONTRACT_REASON[appType][cancelRequest.description])
        })
      });

      Toast.show({
        text: formatLanguage('CANCEL_CONTRACT_SUCCESSFULLY'),
        buttonText: 'OK',
        type: 'success'
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const { screenProps: { appType } } = this.props;

    return (
      <Content contentContainerStyle={styles.container}>
        <Language style={styles.title}>CANCEL_REASON</Language>
        <Picker style={styles.picker} note mode="dropdown" selectedValue={this.state.description}
          onValueChange={reason => this.handlePicker(reason)}>
          {
            CANCEL_CONTRACT_REASON[appType].map((reason, index) => {
              return (
                <Picker.Item key={index} label={formatLanguage(reason)} value={index} />
              );
            })
          }
        </Picker>
        <Textarea placeholderTextColor='lightgrey'
          placeholder={formatLanguage('CANCEL_REASON')}
          rowSpan={5} bordered style={{
            ...styles.otherReason,
            ...{ display: this.state.otherReason.isVisible ? 'flex' : 'none' }
          }} value={this.state.otherReason.content}
          onChangeText={reason => this.handleAnotherReason(reason)} />
        <Button style={styles.button} onPress={this.handleCancelContract}>
          <Language>CANCEL_CONTRACT</Language>
        </Button>
      </Content>
    );
  }
}
