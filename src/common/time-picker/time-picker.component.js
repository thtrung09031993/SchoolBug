import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Icon,
  View
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import { formatTime } from 'common/datetime-formatter';
import Language from 'common/language';
import { styles } from './time-picker.style';

export default class TimePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTimePickerVisible: false
    };
  }

  showTimePicker = () => {
    this.setState({
      isTimePickerVisible: true
    });
  }

  hideTimePicker = () => {
    this.setState({
      isTimePickerVisible: false
    });
  }

  handleTimePick = time => {
    this.setState({
      isTimePickerVisible: false
    });

    this.props.updateTime(time);
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.timePicker} onPress={this.showTimePicker}>
          <Language style={this.props.time === '' ? styles.noTime : styles.time}>
            {this.props.time === ''
              ?
              'NO_TIME'
              :
              formatTime(this.props.time)}
          </Language>
          <Icon style={styles.icon} name="timer" />
        </TouchableOpacity>
        <DateTimePicker
          date={this.props.time}
          mode={'time'}
          minuteInterval={5}
          isVisible={this.state.isTimePickerVisible}
          onCancel={this.hideTimePicker}
          onConfirm={this.handleTimePick}
        />
      </View>
    );
  }
}