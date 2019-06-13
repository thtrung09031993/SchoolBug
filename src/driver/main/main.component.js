import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Toast } from 'native-base';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Notifications } from 'expo';

import Home from './pages/home';
import Services from './pages/services';
import ServiceDetail from './pages/service-detail';
import SchoolDrive from './pages/school-drive';
import DriveCompletion from './pages/drive-completion';
import ServiceOpening from './pages/service-opening';
import CarUpdating from './pages/car-updating';
import FeedbackReview from './pages/feedback-review';

import History from 'common/history';
import OrderDetail from 'common/order-detail';
import ProfileUpdating from 'common/profile-updating';
import Activating from 'common/activating';
import Payment from 'common/payment';
import Notification from 'common/notification';
import PlaceSuggestion from 'common/place-autocomplete/components/suggestion-screen';
import Settings from 'common/settings';
import TripCancellation from 'common/trip-cancellation';
import ContractCancellation from 'common/contract-cancellation';
import CancellationReview from 'common/cancellation-review';

import { formatLanguage } from 'common/language';
import store from 'common/store';
import NotificationPopup from 'common/notification-popup';
import Loading from 'common/loading';
import Authorization from 'common/authorization';
import API from 'common/api';
import { userReducer } from 'common/user/user.reducer';

import { BASE_URL, UNAUTHORIZED, PROFILE_API, USER, CAR_API, CAR } from 'constants/api';
import { USER_STORE } from 'constants/store';

import {
  DRIVE_COMPLETION,
  CAR_UPDATING,
  FEEDBACK_REVIEW,
  SERVICE_OPENING,
  SERVICES,
  SERVICE_DETAIL
} from 'driver/constants/screen';

import {
  HOME,
  NOTIFICATION,
  PLACE_SUGGESTION,
  PROFILE_UPDATING,
  ACTIVATING,
  AUTHORIZATION, SETTINGS,
  SCHOOL_DRIVE,
  ORDER_DETAIL,
  PAYMENT,
  HISTORY,
  TRIP_CANCELLATION,
  CANCELLATION_REVIEW,
  CONTRACT_CANCELLATION
} from 'constants/screen';

import { getToken, getLanguage } from 'utils/storage';

import LoadingGif from 'assets/images/loading.gif';

Notifications.createChannelAndroidAsync('schoolbus-driver', {
  name: 'schoolbus-driver',
  sound: true,
  vibrate: true
});

const createRootStack = initialPage => createStackNavigator(
  {
    [HOME]: {
      screen: Home
    },
    [AUTHORIZATION]: {
      screen: Authorization
    },
    [NOTIFICATION]: {
      screen: Notification
    },
    [SERVICES]: {
      screen: Services
    },
    [SERVICE_DETAIL]: {
      screen: ServiceDetail
    },
    [SCHOOL_DRIVE]: {
      screen: SchoolDrive
    },
    [DRIVE_COMPLETION]: {
      screen: DriveCompletion
    },
    [HISTORY]: {
      screen: History
    },
    [ORDER_DETAIL]: {
      screen: OrderDetail
    },
    [SERVICE_OPENING]: {
      screen: ServiceOpening
    },
    [PLACE_SUGGESTION]: {
      screen: PlaceSuggestion
    },
    [CAR_UPDATING]: {
      screen: CarUpdating
    },
    [PROFILE_UPDATING]: {
      screen: ProfileUpdating
    },
    [ACTIVATING]: {
      screen: Activating
    },
    [SETTINGS]: {
      screen: Settings
    },
    [FEEDBACK_REVIEW]: {
      screen: FeedbackReview
    },
    [PAYMENT]: {
      screen: Payment
    },
    [TRIP_CANCELLATION]: {
      screen: TripCancellation
    },
    [CANCELLATION_REVIEW]: {
      screen: CancellationReview
    },
    [CONTRACT_CANCELLATION]: {
      screen: ContractCancellation
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
      const { setUserProfile, setCar } = this.props;
      const driverProfile = await API.get(PROFILE_API);

      if (driverProfile[USER.NAME] && driverProfile[USER.NAME] !== '') {
        setUserProfile && setUserProfile(driverProfile);
        API.get(CAR_API).then(car => {
          if (car[CAR.BRAND] && car[CAR.BRAND] !== '') {
            setCar && setCar(car);

            if (driverProfile[USER.IS_ACTIVE]) {
              this.setState({ loaded: true, initialPage: HOME });
            } else {
              this.setState({ loaded: true, initialPage: ACTIVATING });
            }
          } else {
            Toast.show({
              text: formatLanguage('UPDATE_YOUR_CAR'),
              buttonText: 'OK',
              type: 'warning'
            });
            this.setState({ loaded: true, initialPage: CAR_UPDATING });
          }
        });
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
          ? <RootStack screenProps={{ appType: 'driver' }} />
          : <ImageBackground source={LoadingGif} style={{ flex: 1 }} resizeMode='cover' />}
        <NotificationPopup />
        <Loading />
      </Container>
    );
  }
}
