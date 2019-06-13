import React from 'react';
import { Content, Toast, View, Textarea, Text, Button } from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Image from 'common/image';
import { RATING } from 'constants/common-data';
import { styles, ratingSize } from './feedback.style';
import Language, { formatLanguage } from 'common/language';
import { FEEDBACK, FEEDBACK_API, SERVICE, USER } from 'constants/api';
import API from 'common/api';

export default class Feedback extends React.Component {

  static navigationOptions = () => ({
    title: formatLanguage('FEEDBACK')
  });

  constructor(props) {
    super(props);

    this.state = {
      score: RATING.DEFAULT,
      content: ''
    };
  }

  sendFeedback = async () => {
    try {
      const feedback = this.state;
      const { navigation } = this.props;
      const data = {
        [SERVICE.DRIVER_SERVICE_ID]: navigation.getParam('driverServiceID', null),
        [FEEDBACK.SCORE]: feedback.score,
        [FEEDBACK.CONTENT]: feedback.content
      };

      await API.post(FEEDBACK_API, data);
      Toast.show({
        text: formatLanguage('FEEDBACK_RECORDED'),
        buttonText: 'OK',
        duration: 3000,
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

  handleFields = (field, value) => this.setState({ [field]: value });

  render() {
    const { navigation } = this.props;
    const driver = navigation.getParam('driver', () => { });

    return (
      <Content>
        <KeyboardAvoidingView behavior="position">
          <Language style={styles.title}>YOUR_DRIVER</Language>
          <View style={styles.driver}>
            <View style={styles.leftCol}>
              <Image style={styles.avatar} src={driver[USER.IMAGE]} resizeMode='cover' />
            </View>
            <View style={styles.rightCol}>
              <Text style={styles.name}>{driver[USER.NAME]}</Text>
              <Text>{driver[USER.PHONE_NUMBER]}</Text>
            </View>
          </View>
          <View style={styles.rating}>
            <AirbnbRating
              count={RATING.COUNT}
              reviews={RATING.TITLE.map(title => formatLanguage(title))}
              defaultRating={RATING.DEFAULT}
              size={ratingSize}
              onFinishRating={score => this.handleFields('score', score)}
            />
          </View>
          <Textarea bordered style={styles.content} rowSpan={7} fontSize={20}
            placeholder={formatLanguage('FEEDBACK_PLACEHOLDER')}
            onChangeText={content => this.handleFields('content', content)} />

          <Button style={styles.button} onPress={this.sendFeedback}>
            <Language>MAKE_FEEDBACK</Language>
          </Button>
        </KeyboardAvoidingView>
      </Content>
    );
  }
}
