import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import API from 'common/api';
import Language, { formatLanguage } from 'common/language';
import Cover from 'common/cover';

import { SERVICE_API } from 'constants/api';
import { SCHOOL_DRIVE } from 'constants/screen';
import { SERVICE_DETAIL, SERVICE_OPENING } from 'driver/constants/screen';

import ServiceItem from './components/service-item';

import { parseViewServicesAPI } from './services.util';
import { styles, textStyles } from './services.style';
import { ARRAY_EMPTY, RESPONSE_ERROR } from 'constants/common-data';

export default class Services extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: formatLanguage('SERVICES'),
      headerRight:
        <TouchableOpacity onPress={params.toggleShowing} style={styles.headerRight}>
          <Language style={styles.headerRightText}>{params.isHistory ? 'CURRENT' : 'PAST'}</Language>
        </TouchableOpacity>
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      services: [],
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

    this.getServices(!this.state.isHistory);
  }

  getServices = isHistory => {
    const param = { option: isHistory ? 'history' : 'current' };

    API.get(SERVICE_API, param).then(res => {
      this.setState({ services: parseViewServicesAPI(res), isLoaded: true });
    }).catch(err => {
      this.setState({ services: [], isLoaded: true });
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          err.status
            ?
            (err.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_SERVICE')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status && err.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    });
  }

  handleStartTrip = driverServiceID => {
    const { navigation } = this.props;

    navigation.push(SCHOOL_DRIVE, { driverServiceID });
  }

  handleAddService = () => {
    const { navigation } = this.props;

    navigation.push(SERVICE_OPENING);
  }

  handleChooseService = driverServiceID => {
    const { navigation } = this.props;

    navigation.push(SERVICE_DETAIL, { driverServiceID });
  }

  render() {
    const { services, isHistory, isLoaded } = this.state;

    return (
      <React.Fragment>
        <ScrollView style={styles.container}>
          <NavigationEvents onDidFocus={() => this.getServices(isHistory)} />
          <Language style={textStyles.title}>{isHistory ? 'PAST' : 'CURRENT'}</Language>
          {
            services.length === ARRAY_EMPTY
              ?
              <Language style={textStyles.noRequirement}>NO_SERVICE</Language>
              :
              null
          }
          {isLoaded
            ? services.map((service, index) =>
              <ServiceItem
                key={index}
                {...service}
                handleChooseService={this.handleChooseService}
                handleStartTrip={this.handleStartTrip}
                isHistory={isHistory}
              />)
            : null
          }
          {
            isHistory
              ?
              null
              :
              <TouchableOpacity style={styles.add} onPress={this.handleAddService}>
                <Icon style={styles.addIcon} ios="ios-add" android="md-add" />
              </TouchableOpacity>
          }
        </ScrollView>

        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}
