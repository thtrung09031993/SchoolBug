import React from 'react';
import { Image } from 'react-native';
import { BASE_URL } from 'constants/api';

export default class MyImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  handleError = () => {
    if (!this.state.error) {
      this.setState({ error: true });
    }
  }

  render() {
    const { defaultSource, source, src, ...passedProps } = this.props;

    let imageSource = src ? { uri: `${BASE_URL}${src}` } : source;

    if (source) {
      imageSource = source.uri === "" ? defaultSource : imageSource;
    }
    const loadSource = this.state.error ? defaultSource : imageSource;

    return <Image {...passedProps} source={loadSource} onError={this.handleError} />;
  }
}
