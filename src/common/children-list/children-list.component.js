import React from 'react';
import { View, Text } from 'native-base';
import Image from 'common/image';

import { CHILDREN } from 'constants/api';

import { styles } from './children-list.style';
import { formatDisplayName } from './children-list.util';

export default class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { childrenList } = this.props;

    let displayName = formatDisplayName(childrenList);

    return (
      <View style={styles.container}>
        {childrenList.map((child, index) =>
          <Image key={index} style={styles.image} src={child[CHILDREN.IMAGE]} resizeMode='cover' />
        )}
        <Text style={styles.name}>{displayName}</Text>
      </View>
    );
  }
}
