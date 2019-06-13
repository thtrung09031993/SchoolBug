import React from 'react';
import { View } from 'react-native';
import { StackActions } from 'react-navigation';
import { Item, Label, Input, Button, Toast } from 'native-base';

import ImagePicker from 'common/image-picker';
import Language, { formatLanguage } from 'common/language';
import API from 'common/api';

import { getArrayLastElement } from 'constants/common-data';
import { ORDER_DETAIL } from 'constants/screen';

import { styles } from './drive-completion.style';

import NoImage from 'assets/images/no-image.png';
import { DAILY_TRIP, TRIP_COMPLETION_API } from 'constants/api';

export default class DriveCompletion extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('DRIVE_CONFIRMATION')
  });

  constructor(props) {
    super(props);

    this.state = {
      image: NoImage,
      message: ''
    };
  }

  handleInput = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  }

  handleSubmit = () => {
    const dailyTripID = this.props.navigation.getParam('dailyTripID', null);
    const { image, message } = this.state;
    const form = new FormData();

    form.append(DAILY_TRIP.ID, dailyTripID);
    form.append(DAILY_TRIP.MESSAGE, message);

    if (image.uri) {
      const imageNameArray = image.uri.split('/');

      form.append(DAILY_TRIP.IMAGE, {
        uri: image.uri,
        name: imageNameArray[getArrayLastElement(imageNameArray.length)],
        type: "image/jpeg"
      });
    }

    const customizedAPIOptions = {
      headers: { "Content-Type": "multipart/form-data" },
      body: form
    };

    API.post(TRIP_COMPLETION_API, {}, customizedAPIOptions).then(() => {
      this.props.navigation.dispatch(
        StackActions.replace({ routeName: ORDER_DETAIL, params: { dailyTripID } })
      );
    }).catch(err => {
      Toast.show({
        text: formatLanguage(err.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: err.status ? 'danger' : 'warning'
      });
    });
  }

  render() {
    const { image, message } = this.state;

    return (
      <View style={styles.container}>
        <ImagePicker
          cameraOnly
          style={image.uri ? styles.imageContainer : styles.imagePlaceHolder}
          pickImage={newImage => this.handleInput('image', newImage)}
          imageStyle={image.uri ? styles.image : styles.noImage}
          imageSrc={image}
        />

        <Item style={styles.message} floatingLabel>
          <Label><Language style={styles.title}>MESSAGE</Language></Label>
          <Input value={message} onChangeText={text => this.handleInput('message', text)} />
        </Item>

        <Button style={styles.button} onPress={this.handleSubmit} bordered block>
          <Language style={styles.title}>CONTINUE</Language>
        </Button>
      </View>
    );
  }
}
