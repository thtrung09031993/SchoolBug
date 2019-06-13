import React from 'react';

import { Content, View, Icon, Toast } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { Modal, TouchableOpacity, Alert } from 'react-native';
import API from 'common/api';
import { CHILD_API, CHILDREN } from 'constants/api';
import { styles } from './children-management.style';
import Child from './components/child';
import { CHILD_REGISTRATION } from 'constants/screen';
import Language, { formatLanguage } from 'common/language';
import { RESPONSE_ERROR } from 'constants/common-data';


export default class ChildrenManagement extends React.Component {
  static navigationOptions = () => ({
    title: formatLanguage('MY_CHILDREN')
  });

  constructor(props) {
    super(props);

    this.state = {
      isOptionVisible: false,
      children: [],
      chosenChild: ""
    };
  }

  getChildren = async () => {
    try {
      let children = await API.get(CHILD_API);

      children = Array.isArray(children) ? children : [];
      this.setState({
        children
      });
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'NO_CHILDREN')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status && error.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    }
  }

  showOptions = chosenChild => {
    this.setState({
      isOptionVisible: true,
      chosenChild
    });
  }

  hideOptions = () => {
    this.setState({
      isOptionVisible: false,
      chosenChild: ""
    });
  }

  handleUpdate = () => {
    // go to editor
    const { children, chosenChild } = this.state;
    const { navigation } = this.props;

    navigation.push(CHILD_REGISTRATION, {
      child: children.find(child => {
        return child[CHILDREN.CHILD_ID] === chosenChild;
      })
    });
    this.hideOptions();
  }

  handleDelete = () => {
    Alert.alert(
      formatLanguage('DELETE_CHILD_TITLE'),
      formatLanguage('DELETE_CHILD_QUESTION'),
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'OK', onPress: this.deleteChild }
      ],
      { cancelable: true },
    );
  }

  deleteChild = async () => {
    try {
      const chosenChild = this.state.chosenChild;

      await API.delete(CHILD_API, {
        [CHILDREN.CHILD_ID]: chosenChild
      });

      Toast.show({
        text: formatLanguage('CHILD_DELETED'),
        buttonText: 'OK',
        type: 'success'
      });

      this.setState(prevState => ({
        children: prevState.children.filter(child => {
          return child[CHILDREN.CHILD_ID] !== chosenChild;
        })
      }));
    } catch (error) {
      Toast.show({
        text: formatLanguage(
          // eslint-disable-next-line no-nested-ternary
          error.status
            ?
            (error.status === RESPONSE_ERROR.SERVER ? 'SERVER_ERROR' : 'DELETE_CHILD_ERROR')
            :
            'NETWORK_ERROR'),
        buttonText: 'OK',
        type: error.status && error.status === RESPONSE_ERROR.SERVER ? 'danger' : 'warning'
      });
    }

    this.hideOptions();
  }

  render() {
    const children = this.state.children;
    const { navigation } = this.props;

    return (
      <Content contentContainerStyle={styles.container}>
        <NavigationEvents onDidFocus={this.getChildren} />
        {
          children.map((child, index) => {
            return (
              <Child key={index} child={child} showOptions={this.showOptions} />
            );
          })
        }
        <Modal animationType="fade" onRequestClose={this.hideOptions} visible={this.state.isOptionVisible}
          transparent={true}>
          <TouchableOpacity onPress={this.hideOptions} style={styles.dim}></TouchableOpacity>
          <View style={styles.options}>
            <TouchableOpacity onPress={this.handleUpdate} style={styles.option}>
              <View style={styles.optionTitle}>
                <Icon name="open" style={styles.updateOption} />
              </View>
              <View style={styles.optionContent}>
                <Language style={styles.update}>UPDATE_CHILD</Language>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleDelete} style={styles.option}>
              <View style={styles.optionTitle}>
                <Icon name="trash" style={styles.deleteOption} />
              </View>
              <View style={styles.optionContent}>
                <Language style={styles.update}>DELETE_CHILD</Language>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => navigation.push(CHILD_REGISTRATION)} style={styles.buttonAddChild}>
          <Icon name="add" style={styles.icon} />
        </TouchableOpacity>

      </Content>
    );
  }
}