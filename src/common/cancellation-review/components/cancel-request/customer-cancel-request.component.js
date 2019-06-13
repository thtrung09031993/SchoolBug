import React from 'common/cancellation-review/components/cancel-request/react';
import { View, Text } from 'native-base';
import ChildrenList from 'common/cancellation-review/components/cancel-request/common/children-list';
import { styles } from './cancel-request.style';
import Language from 'common/cancellation-review/components/cancel-request/common/language';

export default class CustomerCancelRequest extends React.Component {
  render() {

    const { children, description, offDay } = this.props.request;

    return (
      <View style={styles.container}>

        <View style={styles.content}>
          <ChildrenList isRowStyle={true} childrenList={children} />
        </View>
        <View style={styles.content}>
          <Language style={styles.title}>OFF_AT </Language>
          <Text>{offDay}</Text>
        </View>
        <View style={styles.content}>
          <Language style={styles.title}>OFF_REASON: </Language>
          <Text>{description}</Text>
        </View>
      </View>
    );
  }
}
