import React from 'react';
import { KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { Content, Item, Label, Input, Button, Text, Toast } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import { saveToken } from 'utils/storage';
import { registerDevice } from 'utils/notifications';

import API from 'common/api';
import Language, { formatLanguage } from 'common/language';

import { HOME, PROFILE_UPDATING, ACTIVATING } from 'constants/screen';
import {
  CUSTOMER_LOGIN_API, DRIVER_LOGIN_API,
  DRIVER_REGISTER_API, CUSTOMER_REGISTER_API,
  USER, PROFILE_API, CAR_API
} from 'constants/api';

import logo from 'assets/images/app-icon.png';

import { styles } from './authorization.style';
import { validateLogin, validateRegister } from './authorization.util';
import { RESPONSE_ERROR } from 'constants/common-data';

export default class Authorization extends React.Component {
  static navigationOptions = {
    title: 'LOGIN',
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoginPage: true,
      phone: '',
      password: '',
      confirm: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { token, username, password } = this.props;

    if (!prevProps.token && token) {
      this.saveToken();
    } else if (!prevProps.username && username) {
      this.props.login && this.props.login(username, password);
    }
  }

  saveToken = async () => {
    await saveToken(this.props.token);
    this.props.navigation.navigate('Home');
  }

  toggleMode = () => {
    const { isLoginPage } = this.state;

    this.setState({ isLoginPage: !isLoginPage });
  }

  handleTextInput = (field, value) => this.setState({ [field]: value });

  handleLogin = async () => {
    const authorization = this.state;

    if (validateLogin(authorization)) {
      try {
        const { setUserProfile, setCar, navigation, screenProps: { appType } } = this.props;
        const loginUrl = appType === 'driver' ? DRIVER_LOGIN_API : CUSTOMER_LOGIN_API;
        const profileUrl = PROFILE_API;
        const res = await API.post(loginUrl, {
          [USER.USERNAME]: authorization.phone,
          [USER.PASSWORD]: authorization.password
        });

        registerDevice();
        saveToken(res.Authorization.access_token);
        API.addToken(res.Authorization.access_token);

        const profile = await API.get(profileUrl);
        const car = appType === 'driver' ? await API.get(CAR_API) : null;

        setUserProfile && setUserProfile(profile);
        appType === 'driver' && setCar && setCar(car);

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: profile[USER.IS_ACTIVE] ? HOME : ACTIVATING })
          ]
        });

        navigation.dispatch(resetAction);
      } catch (error) {
        Toast.show({
          text: formatLanguage(
            // eslint-disable-next-line no-nested-ternary
            error.status
              ?
              (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'WRONG_AUTHORIZATION')
              :
              'NETWORK_ERROR'),
          buttonText: 'OK',
          type: error.status ? 'danger' : 'warning'
        });
      }
    }
  }

  handleRegister = async () => {
    const authorization = this.state;

    if (validateRegister(authorization)) {
      try {
        const { navigation, screenProps: { appType } } = this.props;
        const registerUrl = appType === 'driver' ? DRIVER_REGISTER_API : CUSTOMER_REGISTER_API;
        const res = await API.post(registerUrl, {
          [USER.USERNAME]: authorization.phone,
          [USER.PASSWORD]: authorization.password
        });

        registerDevice();
        saveToken(res.Authorization.access_token);
        API.addToken(res.Authorization.access_token);
        navigation.push(PROFILE_UPDATING);
      } catch (error) {
        Toast.show({
          text: formatLanguage(
            // eslint-disable-next-line no-nested-ternary
            error.status
              ?
              (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'DUPLICATE_USERNAME')
              :
              'NETWORK_ERROR'),
          buttonText: 'OK',
          type: error.status ? 'danger' : 'warning'
        });
      }
    }
  }

  handleSubmit = () => {
    const { isLoginPage } = this.state;

    if (isLoginPage) {
      this.handleLogin();
    }
    else {
      this.handleRegister();
    }
  }

  render() {
    const form = this.state;

    return (
      <Content contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={styles.content} behavior='padding'>

          <Image style={styles.logo} source={logo} resizeMode='contain' />
          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>PHONE_NUMBER</Language></Label>
            <Input
              keyboardType='number-pad'
              onChangeText={phone => this.handleTextInput('phone', phone)}
              value={form.phone}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>PASSWORD</Language></Label>
            <Input
              secureTextEntry={true}
              onChangeText={password => this.handleTextInput('password', password)}
              value={form.password}
            />
          </Item>

          {form.isLoginPage ? null : (
            <Item style={styles.row} floatingLabel>
              <Label style={styles.input}><Language>CONFIRM</Language></Label>
              <Input
                secureTextEntry={true}
                onChangeText={confirm => this.handleTextInput('confirm', confirm)}
                value={form.confirm}
              />
            </Item>
          )}

          <Button style={styles.button} onPress={this.handleSubmit} rounded block>
            <Text>{
              form.isLoginPage
                ?
                formatLanguage('LOGIN')
                :
                formatLanguage('SIGN_UP')
            }</Text>
          </Button>

          <TouchableOpacity style={styles.row} onPress={this.toggleMode} transparent>
            <Text style={styles.link}>
              {
                form.isLoginPage
                  ?
                  formatLanguage('CREATE_ACCOUNT')
                  :
                  formatLanguage('HAVE_ACCOUNT')
              }
            </Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </Content>
    );
  }
}
