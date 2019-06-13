import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Toast } from 'native-base';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Notifications } from 'expo';

import Home from './pages/home';
import Requirements from './pages/requirements';
import RequirementDetail from './pages/requirement-detail';
import ChooseService from './pages/choose-service';
import ServiceRequirement from './pages/service-requirement';
import SchoolDrive from './pages/school-drive';
import Feedback from './pages/feedback';
import ContractExtending from './pages/contract-extending';

import Notification from 'common/notification';
import ChildRegistration from 'common/children-management/components/child-registration';
import ChildrenManagement from 'common/children-management';
import ProfileUpdating from 'common/profile-updating';
import Activating from 'common/activating';
import Settings from 'common/settings';
import TripCancellation from 'common/trip-cancellation';
import History from 'common/history';
import OrderDetail from 'common/order-detail';
import PlaceSuggestion from 'common/place-autocomplete/components/suggestion-screen';
import ContractCancellation from 'common/contract-cancellation';
import CancellationReview from 'common/cancellation-review';

import { formatLanguage } from 'common/language';
import store from 'common/store';
import NotificationPopup from 'common/notification-popup';
import Loading from 'common/loading';
import Authorization from 'common/authorization';
import API from 'common/api';
import { userReducer } from 'common/user/user.reducer';

import { BASE_URL, UNAUTHORIZED, PROFILE_API, USER } from 'constants/api';
import { USER_STORE } from 'constants/store';

import {
  CHOOSE_SERVICE, FEEDBACK,
  SERVICE_REQUIREMENT, REQUIREMENTS,
  REQUIREMENT_DETAIL, CONTRACT_EXTENDING
} from 'customer/constants/screen';

import {
  HOME,
  CHILD_REGISTRATION,
  PLACE_SUGGESTION,
  HISTORY,
  SCHOOL_DRIVE,
  CHILDREN_MANAGEMENT,
  PROFILE_UPDATING,
  AUTHORIZATION,
  SETTINGS,
  TRIP_CANCELLATION,
  ORDER_DETAIL,
  CANCELLATION_REVIEW,
  CONTRACT_CANCELLATION,
  NOTIFICATION,
  ACTIVATING
} from 'constants/screen';

import { getToken, getLanguage } from 'utils/storage';

import LoadingGif from 'assets/images/loading.gif';

Notifications.createChannelAndroidAsync('schoolbus-customer', {
  name: 'schoolbus-customer',
  sound: true,
  vibrate: true
});

const createRootStack = initialPage => createStackNavigator(
  {
    [HOME]: {
      screen: Home
    },
    [SETTINGS]: {
      screen: Settings
    },
    [NOTIFICATION]: {
      screen: Notification
    },
    [AUTHORIZATION]: {
      screen: Authorization
    },
    [REQUIREMENTS]: {
      screen: Requirements
    },
    [REQUIREMENT_DETAIL]: {
      screen: RequirementDetail
    },
    [HISTORY]: {
      screen: History
    },
    [SCHOOL_DRIVE]: {
      screen: SchoolDrive
    },
    [ORDER_DETAIL]: {
      screen: OrderDetail
    },
    [CHOOSE_SERVICE]: {
      screen: ChooseService
    },
    [SERVICE_REQUIREMENT]: {
      screen: ServiceRequirement
    },
    [CHILD_REGISTRATION]: {
      screen: ChildRegistration
    },
    [PLACE_SUGGESTION]: {
      screen: PlaceSuggestion
    },
    [CHILDREN_MANAGEMENT]: {
      screen: ChildrenManagement
    },
    [PROFILE_UPDATING]: {
      screen: ProfileUpdating
    },
    [ACTIVATING]: {
      screen: Activating
    },
    [FEEDBACK]: {
      screen: Feedback
    },
    [TRIP_CANCELLATION]: {
      screen: TripCancellation
    },
    [CANCELLATION_REVIEW]: {
      screen: CancellationReview
    },
    [CONTRACT_CANCELLATION]: {
      screen: ContractCancellation
    },
    [CONTRACT_EXTENDING]: {
      screen: ContractExtending
    }
  },
  {
    initialRouteName: initialPage
  }
);

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      initialPage: ''
    };

    store.injectReducer(USER_STORE, userReducer);
  }

  componentDidMount() {
    this.setBaseUrl();
    this.getToken();
    this.getLanguage();
  }

  setBaseUrl = () => {
    API.addBaseUrl(BASE_URL);
  }

  getLanguage = async () => {
    const language = await getLanguage();

    if (language) {
      const { chooseLanguage } = this.props;

      chooseLanguage(language);
    }
  }

  getToken = async () => {
    const token = await getToken();

    if (token) {
      API.addToken(token);
      this.getProfile();
    } else {
      this.setState({ loaded: true, initialPage: AUTHORIZATION });
    }
  }

  getProfile = async () => {
    try {
      const { setUserProfile } = this.props;
      const customerProfile = await API.get(PROFILE_API);

      if (customerProfile[USER.NAME]) {
        setUserProfile && setUserProfile(customerProfile);

        if (customerProfile[USER.IS_ACTIVE]) {
          this.setState({ loaded: true, initialPage: HOME });
        } else {
          this.setState({ loaded: true, initialPage: ACTIVATING });
        }
      } else {
        Toast.show({
          text: formatLanguage('UPDATE_YOUR_PROFILE'),
          buttonText: 'OK',
          type: 'warning'
        });
        this.setState({ loaded: true, initialPage: PROFILE_UPDATING });
      }
    } catch (error) {
      if (error.status && error.status === UNAUTHORIZED) {
        this.setState({ loaded: true, initialPage: AUTHORIZATION });
        Toast.show({
          text: formatLanguage('SESSION_EXPIRED'),
          buttonText: 'OK',
          type: 'warning'
        });
      } else {
        Toast.show({
          text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
          buttonText: 'OK',
          type: error.status ? 'danger' : 'warning'
        });
        this.setState({ loaded: true, initialPage: HOME });
      }
    }
  }

  render() {
    const RootStack = createAppContainer(createRootStack(this.state.initialPage));

    return (
      <Container>
        {this.state.loaded
          ? <RootStack screenProps={{ appType: 'customer' }} />
          : <ImageBackground source={LoadingGif} style={{ flex: 1 }} resizeMode='cover' />}
        <NotificationPopup />
        <Loading />
      </Container>
    );
  }
}
