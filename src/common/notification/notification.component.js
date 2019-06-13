import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Toast } from 'native-base';

import { formatLanguage } from 'common/language';
import API from 'common/api';

import { NOTIFICATION_API } from 'constants/api';

import NotificationItem from './components/notification-item';

import { parseNotificationsAPI } from './notification.util';

import { textStyles, styles } from './notification.style';
import { RESPONSE_ERROR } from 'constants/common-data';

export default class Notification extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('NOTIFICATIONS')
  });

  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      loaded: false,
      message: ''
    };

    this.page = 0;
  }

  componentDidMount() {
    API.get(NOTIFICATION_API, { page: this.page, startTime: '', endTime: '' }).then(res => {
      this.setState({ notifications: parseNotificationsAPI(res), loaded: true });
    }).catch(err => {
      this.setState({ message: err.Message });
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          err.status
            ?
            (err.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_NOTIFICATION')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status && err.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    });
  }

  handleChooseNotification = notification => {
    const { push } = this.props.navigation;

    push(notification.page, notification.params);
  }

  render() {
    const { notifications, loaded, message } = this.state;

    return (
      <ScrollView style={styles.container}>
        {loaded
          ? notifications.map((notification, index) =>
            <NotificationItem
              key={index}
              {...notification}
              handlePress={() => this.handleChooseNotification(notification)}
            />)
          : <Text style={textStyles.message}>{message}</Text>
        }
      </ScrollView>
    );
  }
}
