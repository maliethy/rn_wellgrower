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
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: color.GrayscaleLine,
};
setGlobalStyles.customLabelStyles = {
  colorFocused: color.PrimaryP900,
  colorBlurred: color.GrayscaleDisabledText,
  fontSizeFocused: ms(12),
  fontSizeBlurred: ms(18),
  topBlurred: vs(10),
  fontFamily: 'NotoSansKR-Regular',
};
setGlobalStyles.labelStyles = {
  // backgroundColor: '#fff',
  color: '#000',
};
setGlobalStyles.inputStyles = {
  color: '#000',
  textAlignVertical: 'center',
  fontSize: ms(18),
  paddingTop: vs(24),
  paddingBottom: 0,
  minHeight: 0,
  lineHeight: 22,
  letterSpacing: -0.6,
  fontFamily: 'NotoSansKR-Regular',
};
