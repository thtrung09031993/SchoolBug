import React from 'react';
import { WebBrowser } from 'expo';

import { formatLanguage } from 'common/language';

export default class Payment extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('PAYMENT')
  });

  componentDidMount = () => {
    WebBrowser.openBrowserAsync('http://192.168.43.39:3001');
  }

  render() {
    return (
      null
    );
  }
}
