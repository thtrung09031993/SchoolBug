import React from 'react';
import { Content, ListItem, List, Toast, Text, View, Button } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { formatLanguage } from 'common/language';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { styles, scoreStyle } from './feedback-review.style';
import API from 'common/api';
import { FEEDBACK_API, FEEDBACK } from 'constants/api';
import { formatDate, formatTime } from 'common/datetime-formatter';
import { RATING } from 'constants/common-data';
import Image from 'common/image';
import Cover from 'common/cover';

export default class FeedbackReview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbacks: [],
      avgScore: 0,
      isLoaded: false
    };
  }

  static navigationOptions = () => ({
    title: formatLanguage('FEEDBACK_REVIEW')
  })

  loadFeedbacks = async () => {
    try {
      const response = await API.get(FEEDBACK_API);

      if (Array.isArray(response[FEEDBACK.FEEDBACKS])) {
        this.setState({
          feedbacks: response[FEEDBACK.FEEDBACKS],
          avgScore: response[FEEDBACK.AVG_SCORE],
          isLoaded: true
        });

      }
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  handleOK = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { user } = this.props;
    const { feedbacks, avgScore, isLoaded } = this.state;

    return (
      <React.Fragment>
        <Content>
          <NavigationEvents onDidFocus={this.loadFeedbacks} />
          <View style={styles.overview}>
            <Image style={styles.avatar} src={user.avatar} resizeMode='cover' />
            <View style={styles.nameAndScore}>
              <Text style={styles.name}>{user.name}</Text>
              <Rating
                ratingCount={5}
                readonly
                startingValue={avgScore}
                imageSize={scoreStyle}
                fractions={2}
              />
            </View>
          </View>
          <List>
            {
              feedbacks.map((feedback, index) => {
                return (
                  <Feedback key={index} feedback={feedback} />
                );
              })
            }
          </List>
          <Button onPress={this.handleOK} style={styles.button}>
            <Text>OK</Text>
          </Button>
        </Content>
        <Cover isLoaded={isLoaded} />
      </React.Fragment>
    );
  }
}

class Feedback extends React.Component {
  render() {
    const { feedback } = this.props;

    return (
      <ListItem style={styles.container}>
        <View style={styles.content}>
          <AirbnbRating
            count={RATING.COUNT}
            isDisabled={true}
            showRating={false}
            size={scoreStyle}
            defaultRating={feedback[FEEDBACK.SCORE]}
          />
          <Text>{feedback[FEEDBACK.CONTENT]}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(feedback[FEEDBACK.CREATE_TIME])} {formatDate(feedback[FEEDBACK.CREATE_TIME])}</Text>
        </View>
      </ListItem>
    );
  }
}
