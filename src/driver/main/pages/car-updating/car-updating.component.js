import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Toast, Content, Input, Label, Item, Button } from 'native-base';
import API from 'common/api';
import { CAR, CAR_API } from 'constants/api';
import { HOME, ACTIVATING } from 'constants/screen';
import { StackActions, NavigationActions } from 'react-navigation';
import { DECIMAL } from 'constants/common-data';
import { styles } from './car-updating.style';
import { validateUpdateCar } from './car-updating.util';
import Language, { formatLanguage } from 'common/language';

export default class CarUpdating extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: formatLanguage('CAR_UPDATING'),
      headerLeft: navigation.state.params ? '' : null
    };
  }

  constructor(props) {
    super(props);
    const { car } = this.props;

    this.state = {
      plateNo: car.plateNo ? car.plateNo : '',
      brand: car.brand ? car.brand : '',
      model: car.model ? car.model : '',
      capacity: `${car.capacity ? car.capacity : '4'}`,
      color: car.color ? car.color : ''
    };
  }

  handleFields = (field, value) => { this.setState({ [field]: value }); }

  handleSubmit = async () => {
    try {
      const car = this.state;

      if (validateUpdateCar(car)) {
        const { navigation, setCar, profile } = this.props;

        const newCar = await API.put(CAR_API, {
          [CAR.PLATE_NUMBER]: car.plateNo,
          [CAR.BRAND]: car.brand,
          [CAR.MODEL]: car.model,
          [CAR.CAPACITY]: parseInt(car.capacity, DECIMAL),
          [CAR.COLOR]: car.color
        });

        setCar && setCar(newCar);
        Toast.show({
          text: formatLanguage('UPDATE_CAR_SUCCESSFULLY'),
          buttonText: 'OK',
          type: 'success'
        });
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: profile.isActive ? HOME : ACTIVATING })
          ]
        });

        navigation.dispatch(resetAction);
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
    const isUpdatingCarAgain = this.props.navigation.getParam('isUpdatingCarAgain', false);

    return (
      <Content contentContainerStyle={styles.container}>
        <KeyboardAvoidingView style={styles.content} behavior="position">
          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>PLATE_NUMBER</Language></Label>
            <Input
              onChangeText={plateNo => this.handleFields('plateNo', plateNo)}
              value={form.plateNo}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>BRAND</Language></Label>
            <Input
              onChangeText={brand => this.handleFields('brand', brand)}
              value={form.brand}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>MODEL</Language></Label>
            <Input
              onChangeText={model => this.handleFields('model', model)}
              value={form.model}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>NUM_OF_SLOT</Language></Label>
            <Input
              keyboardType='number-pad'
              onChangeText={capacity => this.handleFields('capacity', capacity)}
              value={form.capacity}
            />
          </Item>

          <Item style={styles.row} floatingLabel>
            <Label style={styles.input}><Language>COLOR</Language></Label>
            <Input
              onChangeText={color => this.handleFields('color', color)}
              value={form.color}
            />
          </Item>

          <Button style={styles.button} onPress={this.handleSubmit} rounded block>
            <Language>
              {
                isUpdatingCarAgain
                  ?
                  'UPDATE_CAR'
                  :
                  'FINISH'
              }
            </Language>
          </Button>

        </KeyboardAvoidingView>
      </Content>
    );
  }
}