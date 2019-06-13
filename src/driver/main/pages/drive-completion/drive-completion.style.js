import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'constants/color';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 20
  },
  imagePlaceHolder: {
    height: 300,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#848484',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  noImage: {
    height: 100
  },
  image: {
    height: 300
  },
  message: {
    marginTop: 20
  },
  title: {
    color: THEME_COLOR
  },
  button: {
    marginTop: 20,
    borderColor: THEME_COLOR
  }
});
