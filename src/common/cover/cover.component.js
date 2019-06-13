import React from 'react';
import { BlurView } from 'expo';
import { styles } from './cover.style';
import Language from 'common/language';

export default class Cover extends React.Component {
  render() {
    const { isLoaded } = this.props;

    return (
      isLoaded
        ?
        null
        :
        <BlurView style={styles.cover} tint='light' intensity={100} >
        </BlurView>
    );
  }
}