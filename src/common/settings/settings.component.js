import React from 'react';
import { Content, Left, Right, List, ListItem } from 'native-base';
import Language, { formatLanguage } from 'common/language';
import LanguageChoosing from './components/language-choosing';

export default class Settings extends React.Component {

  static navigationOptions = () => ({
    title: formatLanguage('SETTINGS')
  });

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Content>
        <List>
          <LanguageChoosing language={this.props.language}
            chooseLanguage={this.props.chooseLanguage} />
        </List>
      </Content>
    );
  }
}

