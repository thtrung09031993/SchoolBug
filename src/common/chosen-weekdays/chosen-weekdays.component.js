import React from 'react';
import { View } from 'native-base';
import { THEME_COLOR } from 'constants/color';
import { DAYS_OF_WEEK_SHORT } from 'constants/common-data';
import Language from 'common/language';

export default class ChosenWeekdays extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { chosenDays, theme } = this.props;

    let color = 'grey';

    return (
      <View style={{ flexDirection: 'row' }}>
        {Object.keys(DAYS_OF_WEEK_SHORT).map((id, index) => {
          color = chosenDays.includes(id) ? theme.color : 'lightgrey';

          return (
            <Language key={index} style={{ color, marginLeft: 10 }}>{DAYS_OF_WEEK_SHORT[id]}</Language>
          );
        })}
      </View>
    );
  }
}