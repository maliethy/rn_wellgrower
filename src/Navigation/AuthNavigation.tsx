import * as React from 'react';
import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '~/Screens/Auth/Login';
import FindPassword from '~/Screens/Auth/FindPassword';
import CustomCenter from '~/Screens/Auth/CustomCenter';

import Signup from '~/Screens/Auth/Signup';
import UserAgreement from '~/Screens/Setting/CustomCenter/UserAgreement';
import PersonalInfoPolicy from '~/Screens/Setting/CustomCenter/PersonalInfoPolicy';
import LocationServicePolicy from '~/Screens/Setting/CustomCenter/LocationServicePolicy';
import MarketingPolicy from '~/Screens/Auth/Signup/MarketingPolicy';
import Certification from '~/Screens/Auth/Signup/Certification';
import CertificationResult from '~/Screens/Auth/Signup/CertificationResult';
import InputPassword from '~/Screens/Auth/Signup/InputPassword';
import InputAddress from '~/Screens/Auth/Signup/InputAddress';
import Welcome from '~/Screens/Auth/Signup/Welcome';
import PostcodeModal from '~/Components/PostcodeModal';
import NavBack from '~/Assets/Icons/nav_back.svg';
import HeaderCloseButton from '~/Components/HeaderCloseButton';
import { ScaledSheet } from 'react-native-size-matters';
import { s, vs, ms, mvs } from 'react-native-size-matters';

const AuthStack = createStackNavigator();
const authScreens = {
  Login: Login,
  FindPassword: FindPassword,
  CustomCenter: CustomCenter,
};
const signupScreens = {
  Signup: Signup,
  MarketingPolicy: MarketingPolicy,
  UserAgreement: UserAgreement,
  PersonalInfoPolicy: PersonalInfoPolicy,
  LocationServicePolicy: LocationServicePolicy,
  Certification: Certification,
  CertificationResult: CertificationResult,
  InputPassword: InputPassword,
  InputAddress: InputAddress,
  PostcodeModal: PostcodeModal,
  Welcome: Welcome,
};

const AuthNavigation: FC = () => {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },

        cardStyle: styles.cardStyle,
      }}>
      {Object.entries({
        ...authScreens,
        ...signupScreens,
      }).map(([name, component]) => {
        return (
          <AuthStack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerTitle: '회원가입',
              headerTitleStyle: {
                lineHeight: 22,
                letterSpacing: -0.6,
                fontFamily: 'NotoSansKR-Regular',
                fontSize: ms(16),
                // paddingVertical: 16,
              },
              headerTitleContainerStyle: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: ms(16),
              },
              headerBackImage: () => <NavBack style={styles.iconSize} />,
              headerBackTitle: ' ',
              headerRight: () => <HeaderCloseButton />,
              headerRightContainerStyle: styles.headerRightContainerStyle,
            }}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
const styles = ScaledSheet.create({
  cardStyle: { backgroundColor: '#fff' },
  iconSize: { width: ms(16), height: ms(16) },
  headerRightContainerStyle: {
    padding: ms(16),
  },
});
