import React from 'react';
import { View, Text } from 'native-base';
import { TouchableOpacity, ScrollView } from 'react-native';
import { styles, toggleStyles } from './children-picker.style';
import { CHILDREN } from 'constants/api';
import Image from 'common/image';
import Language from 'common/language';

export default class ChildrenPicker extends React.Component {
  render() {

    const { title, childrenList, chosenChildren, handleChosenChildren } = this.props;

    return (

      <View style={styles.container}>
        <Language style={styles.title}>{title}</Language>
        <ScrollView contentContainerStyle={styles.childrenList} horizontal={true} showsHorizontalScrollIndicator={false}>

          {childrenList.map((child, index) => {
            return (
              <Child key={index} id={child[CHILDREN.CHILD_ID]}
                name={child[CHILDREN.NAME]} image={child[CHILDREN.IMAGE]}
                chosenChildren={chosenChildren} handleChosenChildren={handleChosenChildren}
              />
            );
          })}

        </ScrollView>
      </View>

    );
  }
}

class Child extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChosen: this.props.chosenChildren.includes(this.props.id),
      imageStyle: {
        ...styles.image, ...this.props.chosenChildren.includes(this.props.id) ?
          toggleStyles.chosenImage : toggleStyles.notChosenImage
      },
      textStyle: this.props.chosenChildren.includes(this.props.id) ?
        toggleStyles.chosenText : toggleStyles.notChosenText
    };
  }

  isChildChosen = () => {
    const { id, handleChosenChildren } = this.props;

    let { chosenChildren } = this.props;

    if (this.state.isChosen) {
      this.setState({
        imageStyle: {
          ...styles.image, ...toggleStyles.notChosenImage
        },
        textStyle: toggleStyles.notChosenText
      });

      chosenChildren = chosenChildren.filter((childID) => {
        return childID !== id;
      });
    } else {
      this.setState({
        imageStyle: {
          ...styles.image, ...toggleStyles.chosenImage
        },
        textStyle: toggleStyles.chosenText
      });

      chosenChildren.push(id);
    }

    this.setState((prevState) => ({
      isChosen: !prevState.isChosen
    }));

    handleChosenChildren(chosenChildren);
  }

  render() {
    const { name, image } = this.props;

    return (
      <TouchableOpacity style={styles.child} activeOpacity={1} onPress={this.isChildChosen}>
        <Image style={this.state.imageStyle} src={image} resizeMode="cover" />
        <Text style={this.state.textStyle}>{name}</Text>
      </TouchableOpacity>
    );
  }
}