import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { styles } from './child.style';
import Image from 'common/image';
import Language from 'common/language';
import { CHILDREN, SCHOOL } from 'constants/api';

export default class Child extends React.Component {

  render() {
    const { child, showOptions } = this.props;

    return (
      <TouchableOpacity onLongPress={() => showOptions(child[CHILDREN.CHILD_ID])}
        style={styles.container}>
        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Image src={child[CHILDREN.IMAGE]} style={styles.image} resizeMode="cover" />
          </View>
          <View style={styles.rightCol}>
            <Text>{child[CHILDREN.NAME]}</Text>
          </View>
        </View>

        {/* <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="calendar" style={styles.icon} />
          </View>
          <View style={styles.rightCol}>
            <Text>{formatDate(child[CHILDREN.BIRTH_DATE])}</Text>
          </View>
        </View> */}

        <View style={styles.info}>
          <View style={styles.leftCol}>
            <Icon name="school" style={styles.icon} />
          </View>
          <View style={styles.rightCol}>
            <Text>
              {child[SCHOOL.SCHOOL][SCHOOL.NAME]}{"\n"}
              <Language style={styles.title}>CLASS</Language>: {child[CHILDREN.CLASS_NAME]}
            </Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  }
}