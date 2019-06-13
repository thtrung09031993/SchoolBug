import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { Text } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

import { BASE_URL } from 'constants/api';

const messageStyle = {
  color: '#FFFFFF',
  fontSize: 18,
  margin: 20
};

export default class Verification extends React.Component {
  render() {
    const { visible, handleClose, image, message } = this.props;
    const images = [{ url: `${BASE_URL}${image}` }];

    return (
      <Modal animationType="fade" onRequestClose={handleClose} visible={visible}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onCancel={handleClose}
          loadingRender={() => <ActivityIndicator color='white' size='large' />}
          renderFooter={() => <Text style={messageStyle}>{message}</Text>}
        />
      </Modal>
    );
  }
}
