import React from 'react';
import {
  Content,
  Input,
  Button,
  Item,
  Label,
  View,
  Toast
} from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import { styles } from './child-registration.style';
import { validateChild } from './child-registration.util';
import ImagePicker from 'common/image-picker';
import DatePicker from 'common/date-picker';
import Language, { formatLanguage } from 'common/language';
import PlaceSuggestion from 'common/place-autocomplete';
import { ARRAY_FIRST, getArrayLastElement } from 'constants/common-data';
import API from 'common/api';
import geocode from 'common/geocode-api';
import { CHILD_API, CHILDREN, SCHOOL, ADDRESS, BASE_URL } from 'constants/api';

export default class ChildRegistration extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params ? formatLanguage('UPDATE_CHILD') : formatLanguage('ADD_CHILD')
    };
  }

  constructor(props) {
    super(props);
    const child = props.navigation.getParam('child', null);

    this.state = {
      name: child ? child[CHILDREN.NAME] : '',
      class: child ? child[CHILDREN.CLASS_NAME] : '',
      school: child
        ? `${child[SCHOOL.SCHOOL][SCHOOL.NAME]}, ${child[SCHOOL.SCHOOL][ADDRESS.ADDRESS][ADDRESS.DETAIL]}`
        : '',
      birthday: child ? new Date(child[CHILDREN.BIRTH_DATE]) : new Date(),
      image: {
        uri: child ? `${BASE_URL}${child[CHILDREN.IMAGE]}` : ''
      }
    };
  }

  handleFields = (field, value) => { this.setState({ [field]: value }); };

  handleSubmit = () => {
    const child = this.state;

    if (validateChild(child)) {
      this.addOrUpdateChild();
    }
  }

  addOrUpdateChild = async () => {
    try {
      const newChild = this.state;
      const { navigation } = this.props;
      const currentChild = this.props.navigation.getParam('child', null);

      let child = new FormData();


      child.append([CHILDREN.CHILD], JSON.stringify({
        [CHILDREN.NAME]: newChild.name,
        [CHILDREN.BIRTH_DATE]: newChild.birthday,
        [CHILDREN.CLASS_NAME]: newChild.class
      }));

      const schoolName = newChild.school.split(',')[ARRAY_FIRST];
      const schoolGeocodeResult = await geocode(newChild.school);

      child.append([SCHOOL.SCHOOL], JSON.stringify({
        [SCHOOL.NAME]: schoolName,
        [ADDRESS.ADDRESS]: {
          [ADDRESS.DETAIL]: schoolGeocodeResult.formatted_address,
          [ADDRESS.LATITUDE]: schoolGeocodeResult.geometry.location.lat,
          [ADDRESS.LONGITUDE]: schoolGeocodeResult.geometry.location.lng
        }
      }));

      const imageNameArray = newChild.image.uri.split('/');

      child.append(CHILDREN.IMAGE, {
        uri: newChild.image.uri,
        name: imageNameArray[getArrayLastElement(imageNameArray.length)],
        type: "image/jpeg"
      });

      const customizedAPIOptions = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: child
      };

      if (currentChild) {
        await API.put(`${CHILD_API}?${CHILDREN.CHILD_ID}=${currentChild[CHILDREN.CHILD_ID]}`, {}, customizedAPIOptions);
        Toast.show({
          text: formatLanguage('UPDATE_CHILD_SUCCESSFULLY'),
          buttonText: 'OK',
          type: 'success'
        });
      } else {
        await API.post(CHILD_API, {}, customizedAPIOptions);
        Toast.show({
          text: formatLanguage('ADD_CHILD_SUCCESSFULLY'),
          buttonText: 'OK',
          type: 'success'
        });
      }

      navigation.goBack();
    } catch (error) {
      Toast.show({
        text: formatLanguage(error.status ? 'SERVER_ERROR' : 'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }
  }

  render() {
    return (
      <Content contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={styles.content} behavior='position'>

          <ImagePicker
            squared
            resizeMode='cover'
            pickImage={image => this.handleFields('image', image)}
            imageStyle={styles.image} imageSrc={this.state.image}
          />

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language style={styles.title}>NAME</Language></Label>
            <Input value={this.state.name} onChangeText={name => this.handleFields('name', name)} />
          </Item>

          <View style={styles.picker}>
            <Label style={styles.input}><Language style={styles.title}>BIRTHDAY</Language></Label>
            <DatePicker updateDate={birthday => this.handleFields('birthday', birthday)} date={this.state.birthday} />
          </View>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language style={styles.title}>CLASS</Language></Label>
            <Input value={this.state.class} onChangeText={className => this.handleFields('class', className)} />
          </Item>


          <View style={styles.picker}>
            <Label style={styles.input}><Language style={styles.title}>SCHOOL</Language></Label>
            <PlaceSuggestion place={this.state.school}
              updatePlace={school => this.handleFields('school', school)} />
          </View>


          <Button style={styles.button} onPress={this.handleSubmit} rounded block>
            <Language>{this.props.navigation.getParam('child', null) ? 'UPDATE_CHILD_SUBMIT' : 'ADD_CHILD_SUBMIT'}</Language>
          </Button>

        </KeyboardAvoidingView>
      </Content>
    );
  }
}
