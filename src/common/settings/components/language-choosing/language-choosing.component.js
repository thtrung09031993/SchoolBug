import React from 'react';
import { Modal } from 'react-native';
import { List, ListItem, Left, Right, Icon, Button, Toast } from 'native-base';
import { VIETNAMESE, ENGLISH } from 'constants/language';
import Language, { formatLanguage } from 'common/language';
import { styles } from './language-choosing.style';
import { StackActions, NavigationActions } from 'react-navigation';
import { HOME } from 'constants/screen';
import { saveLanguage } from 'utils/storage';

export default class LanguageChoosing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLanguagesVisible: false
    };
  }

  hideLanguages = () => this.setState({ isLanguagesVisible: false });

  showLanguages = () => this.setState({ isLanguagesVisible: true });

  chooseLanguage = async language => {
    try {
      const { navigation, chooseLanguage } = this.props;

      await saveLanguage(language);
      chooseLanguage(language);
      this.hideLanguages();
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: HOME })
        ]
      });

      navigation.dispatch(resetAction);
    } catch (error) {
      Toast.show({
        text: formatLanguage('NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    return (
      <ListItem onPress={this.showLanguages}>
        <Left>
          <Language>LANGUAGE</Language>
        </Left>
        <Right>
          <Language>{this.props.language}</Language>
        </Right>
        <Modal animationType="slide" onRequestClose={this.hideLanguages} visible={this.state.isLanguagesVisible}>
          <List>
            <ListItem>
              <Left>
                <Button transparent onPress={this.hideLanguages}>
                  <Icon style={styles.icon} name="arrow-round-back" />
                </Button>
                <Language style={styles.title}>CHOOSE_LANGUAGE</Language>
              </Left>
            </ListItem>
            <ListItem onPress={() => this.chooseLanguage(VIETNAMESE)}>
              <Left>
                <Language>{VIETNAMESE}</Language>
              </Left>
            </ListItem>
            <ListItem onPress={() => this.chooseLanguage(ENGLISH)}>
              <Left>
                <Language>{ENGLISH}</Language>
              </Left>
            </ListItem>
          </List>
        </Modal>
      </ListItem>
    );
  }
}