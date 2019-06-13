import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, List, ListItem, Container, Content, Text } from 'native-base';

import { MAP_API_KEY, PLACE_AUTOCOMPLETE_API_BASE_URL } from 'constants/api';
import { SUGGESTION_TIMEOUT } from 'constants/common-data';
import { formatLanguage } from 'common/language';

let suggestPlaces = () => { };

export default class SuggestionScreen extends React.Component {

  static navigationOptions = () => ({
    title: formatLanguage('CHOOSE_A_LOCATION')
  });

  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      results: []
    };
  }

  handleSuggestion = (keyword) => {
    this.setState({
      keyword
    });
    clearTimeout(suggestPlaces);
    suggestPlaces = setTimeout(async () => {
      const url = `${PLACE_AUTOCOMPLETE_API_BASE_URL}input=${this.state.keyword}&language=vi&key=${MAP_API_KEY}`;
      const response = await fetch(url);
      const results = await response.json();

      this.setState({ results: results.predictions });
    }, SUGGESTION_TIMEOUT);
  }

  handleChosenLocation = (location) => {
    const { navigation } = this.props;
    const onChosenLocation = navigation.getParam('onChosenLocation', () => { });

    onChosenLocation(location.description);
    navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Input autoFocus placeholder={'Type a place'} onChangeText={keyword => this.handleSuggestion(keyword)} />
            </ListItem>
            {this.state.results.map((result) => (
              <ListItem key={result.id}>
                <TouchableOpacity onPress={() => this.handleChosenLocation(result)}>
                  <Text >{result.description}</Text>
                </TouchableOpacity>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}


