import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { THEME_COLOR } from 'constants/color';

import { styles } from './loading.style';

export default class Loading extends React.Component {
  render() {
    const { isLoading, finishLoading } = this.props;

    return isLoading ?
      <View style={styles.container}>
        <TouchableOpacity onLongPress={finishLoading} style={styles.loading}>
          <ActivityIndicator size='large' color={THEME_COLOR} />
        </TouchableOpacity>
      </View>
      : null;
  }
}
