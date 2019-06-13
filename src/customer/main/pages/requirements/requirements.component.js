import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import API from 'common/api';
import Language, { formatLanguage } from 'common/language';
import Cover from 'common/cover';

import { REQUIREMENT_API } from 'constants/api';
import { SERVICE_REQUIREMENT, REQUIREMENT_DETAIL } from 'customer/constants/screen';

import RequirementItem from './components/requirement-item';

import { parseViewRequirementsAPI } from './requirements.util';
import { styles, textStyles } from './requirements.style';
import { ARRAY_EMPTY, RESPONSE_ERROR } from 'constants/common-data';

export default class Requirements extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: formatLanguage('REQUIREMENT'),
      headerRight:
        <TouchableOpacity onPress={params.toggleShowing} style={styles.headerRight}>
          <Language style={styles.headerRightText}>{params.isHistory ? 'CURRENT' : 'PAST'}</Language>
        </TouchableOpacity>
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      requirements: [],
      isLoaded: false,
      isHistory: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      isHistory: this.state.isHistory,
      toggleShowing: this.toogleHistoryCurrent
    });
  }

  toogleHistoryCurrent = () => {
    this.setState(prevState => ({
      isHistory: !prevState.isHistory
    }));

    this.props.navigation.setParams({
      isHistory: !this.state.isHistory
    });

    this.getRequirements(!this.state.isHistory);
  }

  getRequirements = isHistory => {
    const param = { option: isHistory ? 'history' : 'current' };

    API.get(REQUIREMENT_API, param).then(res => {
      this.setState({ requirements: parseViewRequirementsAPI(res), isLoaded: true });
    }).catch(err => {
      this.setState({ requirements: [], isLoaded: true });
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          err.status
            ?
            (err.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_REQUIREMENT')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status && err.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    });
  }

  handleAddRequirement = () => {
    const { navigation } = this.props;

    navigation.push(SERVICE_REQUIREMENT);
  }

  handleChooseService = customerRequirementID => {
    const { navigation } = this.props;

    navigation.push(REQUIREMENT_DETAIL, { customerRequirementID });
  }

  render() {
    const { requirements, isLoaded, isHistory } = this.state;

    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          <NavigationEvents onDidFocus={() => this.getRequirements(isHistory)} />
          <Language style={textStyles.title}>{isHistory ? 'PAST' : 'CURRENT'}</Language>
          {
            requirements.length === ARRAY_EMPTY
              ?
              <Language style={textStyles.noRequirement}>NO_REQUIREMENT</Language>
              :
              null
          }
          {isLoaded
            ? requirements.map((service, index) =>
              <RequirementItem
                key={index}
                {...service}
                handleChooseService={this.handleChooseService}
                isHistory={isHistory}
              />)
            : null
          }
          {
            isHistory
              ?
              null
              :
              <TouchableOpacity style={styles.add} onPress={this.handleAddRequirement}>
                <Icon style={styles.addIcon} ios="ios-add" android="md-add" />
              </TouchableOpacity>
          }
        </ScrollView>
        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}
