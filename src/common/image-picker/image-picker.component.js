import React from 'react';
import { ImagePicker } from 'expo';
import { TouchableOpacity, Modal, Platform } from 'react-native';
import Image from 'common/image';
import { View, Icon, Toast } from 'native-base';
import Language from 'common/language';
import { ASPECT_IMAGE, IMAGE_QUALITY } from 'constants/common-data';
import DefaultImage from 'assets/images/default-profile.png';
import { styles } from './image-picker.style';
import { formatLanguage } from 'common/language/index';
import { getPermissions } from './image-picker.util';

export default class ImagePickerComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imageSourceVisible: false
    };
  }

  showImageSource = () => {
    this.setState({ imageSourceVisible: true });
  }

  hideImageSource = () => {
    this.setState({ imageSourceVisible: false });
  }

  showImageTool = async type => {
    const { squared } = this.props;

    try {
      const config = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: squared,
        aspect: ASPECT_IMAGE,
        quality: IMAGE_QUALITY
      };

      if (await getPermissions(Platform.OS, type)) {
        const image = type === 'storage'
          ?
          await ImagePicker.launchImageLibraryAsync(config)
          :
          await ImagePicker.launchCameraAsync(config);

        if (!image.cancelled) {
          this.props.pickImage({ uri: image.uri });
        }
      }

    } catch (error) {
      Toast.show({
        text: formatLanguage('ERROR'),
        buttonText: 'OK',
        type: error.status ? 'danger' : 'warning'
      });
    }

    this.hideImageSource();
  }

  render() {
    const { style, resizeMode = 'contain', cameraOnly = false } = this.props;

    return (
      <TouchableOpacity style={style} onPress={this.showImageSource} activeOpacity={0}>
        <Image source={this.props.imageSrc} defaultSource={DefaultImage}
          style={this.props.imageStyle} resizeMode={resizeMode} />
        <Modal animationType="fade" visible={this.state.imageSourceVisible}
          onRequestClose={this.hideImageSource} transparent={true}>
          <TouchableOpacity style={styles.dim} onPress={this.hideImageSource}></TouchableOpacity>
          <View style={styles.imageSource}>
            <TouchableOpacity onPress={() => this.showImageTool('camera')} style={styles.source}>
              <Icon style={styles.icon} name="camera" />
              <Language>CAMERA</Language>
            </TouchableOpacity>
            {cameraOnly
            ? null
            : <TouchableOpacity onPress={() => this.showImageTool('storage')} style={styles.source}>
                <Icon style={styles.icon} name="image" />
                <Language>STORAGE</Language>
              </TouchableOpacity>
            }
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}