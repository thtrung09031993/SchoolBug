import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {
  Toast, Content, Input, Label,
  Item, Button, View
} from 'native-base';
import { styles } from './profile-updating.style';
import { validateUpdateProfile } from './profile-updating.util';
import {
  PROFILE_API, USER, ADDRESS, BASE_URL
} from 'constants/api';
import { HOME, ACTIVATING } from 'constants/screen';
import { StackActions, NavigationActions } from 'react-navigation';
import { getArrayLastElement } from 'constants/common-data';
import { CAR_UPDATING } from 'driver/constants/screen';
import API from 'common/api';
import Language, { formatLanguage } from 'common/language';
import ImagePicker from 'common/image-picker';
import PlaceSuggestion from 'common/place-autocomplete';

export default class ProfileUpdating extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: formatLanguage('PROFILE_UPDATING'),
      headerLeft: navigation.state.params ? '' : null
    };
  }

  constructor(props) {
    super(props);
    const { user } = this.props;

    this.state = {
      image: { uri: user.avatar ? `${BASE_URL}${user.avatar}` : '' },
      name: user.name ? user.name : '',
      id: user.idCard ? user.idCard : '',
      address: user.address ? user.address : ''
    };
  }

  handleFields = (field, value) => { this.setState({ [field]: value }); }


  handleSubmit = async () => {
    try {
      const profile = this.state;

      if (validateUpdateProfile(profile)) {
        const { setUserProfile, navigation, screenProps: { appType } } = this.props;
        const updateProfileUrl = PROFILE_API;
        const isUpdatingProfileAgain = this.props.navigation.getParam('isUpdatingProfileAgain', false);

        let form = new FormData();

        const imageNameArray = profile.image.uri.split('/');

        form.append(USER.IMAGE, {
          uri: profile.image.uri,
          name: imageNameArray[getArrayLastElement(imageNameArray.length)],
          type: "image/jpeg"
        });
        form.append(USER.PROFILE, JSON.stringify({
          [USER.NAME]: profile.name,
          [ADDRESS.ADDRESS]: profile.address,
          [USER.IDENTITY_CARD]: profile.id,
          [USER.EMAIL]: ''
        }));
        const customizedAPIOptions = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: form
        };
        const newProfile = await API.put(updateProfileUrl, {}, customizedAPIOptions);

        setUserProfile && setUserProfile(newProfile);
        Toast.show({
          text: formatLanguage('UPDATE_PROFILE_SUCCESSFULLY'),
          buttonText: 'OK',
          type: 'success'
        });
        if (appType === 'driver' && !isUpdatingProfileAgain) {
          navigation.push(CAR_UPDATING);
        } else {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: newProfile[USER.IS_ACTIVE] ? HOME : ACTIVATING })
            ]
          });

          navigation.dispatch(resetAction);
        }
      }
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    const form = this.state;
    const { screenProps: { appType } } = this.props;
    const isUpdatingProfileAgain = this.props.navigation.getParam('isUpdatingProfileAgain', false);

    return (
      <Content contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={styles.content} behavior="position">

          <ImagePicker squared resizeMode='cover' pickImage={image => this.handleFields('image', image)}
            imageStyle={styles.image} imageSrc={form.image} />

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>NAME</Language></Label>
            <Input
              onChangeText={name => this.handleFields('name', name)}
              value={form.name}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>ID_CARD</Language></Label>
            <Input
              keyboardType='number-pad'
              onChangeText={id => this.handleFields('id', id)}
              value={form.id}
            />
          </Item>

          <View style={styles.picker}>
            <Label style={styles.input}><Language>ADDRESS</Language></Label>
            <PlaceSuggestion place={form.address}
              updatePlace={address => this.handleFields('address', address)} />
          </View>

          <Button style={styles.button} onPress={this.handleSubmit} rounded block>
            {
              isUpdatingProfileAgain
                ?
                <Language>UPDATE_PROFILE</Language>
                :
                <Language>
                  {
                    appType === 'driver'
                      ?
                      'CONTINUE'
                      :
                      'FINISH'
                  }
                </Language>
            }
          </Button>

        </KeyboardAvoidingView>
      </Content>
    );
  }
}