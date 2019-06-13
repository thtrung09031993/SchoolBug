import React, { Component } from 'react';
import { Button, View } from 'native-base';
import Language from 'common/language';
import { DAYS_OF_WEEK_SHORT } from 'constants/common-data';
import { styles, toggleStyles } from './weekdays-choosing.style';

export default class WeekdaysChoosing extends Component {
  render() {
    return (
      <View style={styles.container}>
        {Object.keys(DAYS_OF_WEEK_SHORT).map((id, index) => {
          return (
            <WeekDay key={index} id={id} name={DAYS_OF_WEEK_SHORT[id]}
              updateDays={this.props.updateDays} chosenDays={this.props.chosenDays} />
          );
        })}
      </View>
    );
  }
}

class WeekDay extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isChosen: this.props.chosenDays.includes(this.props.id),
      buttonStyle: {
        ...styles.button, ...this.props.chosenDays.includes(this.props.id) ?
          toggleStyles.chosenButton : toggleStyles.notChosenButton
      },
      textStyle: {
        ...styles.day, ...this.props.chosenDays.includes(this.props.id) ?
          toggleStyles.chosenText : toggleStyles.notChosenText
      }
    };
  }

  handleToggle = () => {
    const { id, updateDays } = this.props;

    let { chosenDays } = this.props;

    if (this.state.isChosen) {
      this.setState({
        buttonStyle: {
          ...styles.button, ...toggleStyles.notChosenButton
        },
        textStyle: {
          ...styles.day, ...toggleStyles.notChosenText
        }
      });

      chosenDays = chosenDays.filter(dayID => {
        return dayID !== id;
      });
    } else {
      this.setState({
        buttonStyle: {
          ...styles.button, ...toggleStyles.chosenButton
        },
        textStyle: {
          ...styles.day, ...toggleStyles.chosenText
        }
      });

      chosenDays.push(id);
    }

    this.setState((prevState) => ({
      isChosen: !prevState.isChosen
    }));

    updateDays(chosenDays);
  }

  render() {
    return (
      <Button style={this.state.buttonStyle}
        onPress={this.handleToggle}>
        <Language style={this.state.textStyle}>{this.props.name}</Language>
      </Button>
    );
  }
}