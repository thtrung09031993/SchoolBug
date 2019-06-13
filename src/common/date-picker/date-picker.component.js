import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Icon,
  View
} from 'native-base';
import { TouchableOpacity } from 'react-native';

import { formatDate } from 'common/datetime-formatter';
import Language, { formatLanguage } from 'common/language';
import { styles } from './date-picker.style';
import { DAYS_OF_WEEK_SHORT } from 'constants/common-data';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerVisible: false
    };
  }

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: true
    });
  }

  hideDatePicker = () => {
    this.setState({
      isDatePickerVisible: false
    });
  }

  handleDatePick = date => {

    this.setState({
      isDatePickerVisible: false
    });

    this.props.updateDate(date);
  }

  render() {
    const { date } = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.datePicker} onPress={this.showDatePicker}>
          <Language style={this.props.date === '' ? styles.noDate : styles.date}>
            {
              this.props.weekday
                ?
                `${formatLanguage(DAYS_OF_WEEK_SHORT[new Date(date).getDay()])}, `
                :
                ''
            }
            {
              formatDate(this.props.date)
            }
          </Language>
          <Icon style={styles.icon} name={'calendar'} />
        </TouchableOpacity>
        <DateTimePicker
          date={this.props.date}
          minimumDate={this.props.minimumDate}
          maximumDate={this.props.maximumDate}
          mode={'date'}
          isVisible={this.state.isDatePickerVisible}
          onCancel={this.hideDatePicker}
          onConfirm={this.handleDatePick}
        />
      </View>
    );
  }
}