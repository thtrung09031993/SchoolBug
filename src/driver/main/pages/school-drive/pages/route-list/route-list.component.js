import React from 'react';
import { ScrollView, View } from 'react-native';
import { Icon, Button } from 'native-base';

import Language, { formatLanguage } from 'common/language';

import { ARRAY_FIRST, ARRAY_STEP } from 'constants/common-data';

import RouteItem from './components/route-item';
import { styles, textStyles } from './route-list.style';

export default class RouteList extends React.Component {
  static navigationOptions = () => ({
    tabBarLabel: formatLanguage('PICKING_UP_LIST'),
    tabBarIcon: ({ tintColor }) => <Icon ios='ios-list' android="md-list" style={{ color: tintColor }}/>
  });

  render() {
    const {
      points,
      handleNotify,
      handleChild,
      handleArriveSchool,
      handleFinish,
      isGoingToSchool
    } = this.props.screenProps;
    const finished = points.filter(point => !point.achieved).length ? undefined : true;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          <View style={styles.timeline} />
          {points.slice(ARRAY_FIRST, points.length - ARRAY_STEP).map((item, index) =>
            <RouteItem
              key={index}
              index={index}
              item={item}
              isGoingToSchool={isGoingToSchool}
              handleNotify={handleNotify}
              handleChild={handleChild}
              handleArriveSchool={handleArriveSchool}
            />
          )}
        </View>
        {points.length ?
          <RouteItem
            index={points.length - ARRAY_STEP}
            item={points[points.length - ARRAY_STEP]}
            isGoingToSchool={isGoingToSchool}
            handleNotify={handleNotify}
            handleChild={handleChild}
            handleArriveSchool={handleArriveSchool}
          />
          : null
        }
        {finished ?
          <Button style={styles.button} onPress={handleFinish} bordered block>
            <Language style={textStyles.button}>FINISH</Language>
          </Button>
          : null
        }
      </ScrollView>
    );
  }
}
