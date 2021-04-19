import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { setGlobalStyles } from 'react-native-floating-label-input';
import { color } from './src/styles';
import { s, vs, ms, mvs } from 'react-native-size-matters';

AppRegistry.registerComponent(appName, () => App);

setGlobalStyles.containerStyles = {
  flex: 1,
  borderBottomWidth: 1,
  borderColor: color.GrayscaleLine,
};
setGlobalStyles.customLabelStyles = {
  colorFocused: color.PrimaryP900,
  colorBlurred: color.GrayscaleDisabledText,
  fontSizeFocused: ms(12, 0.3),
  fontSizeBlurred: ms(16, 0.3),
  topBlurred: vs(10),
  fontFamily: 'NotoSansKR-Regular',
};
setGlobalStyles.labelStyles = {
  backgroundColor: '#fff',
  color: '#000',
};
setGlobalStyles.inputStyles = {
  color: '#000',
  paddingTop: vs(20),
  paddingBottom: 0,
  lineHeight: 22,
  letterSpacing: -0.6,
  fontFamily: 'NotoSansKR-Regular',
};
