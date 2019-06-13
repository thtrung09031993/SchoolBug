import { NativeModules } from 'react-native';
import url from 'url';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

const reactotron = Reactotron
  .configure({ host: hostname })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

Reactotron.log('hello from reactotron!');
console.log(hostname);

export default reactotron;
