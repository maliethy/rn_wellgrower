import 'react-native-gesture-handler';
import * as React from 'react';
import { FC, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import Login from '~/Screens/Auth/Login';
import FindPassword from '~/Screens/Auth/FindPassword';
import CustomCenter from '~/Screens/Auth/CustomCenter';

import Signup from '~/Screens/Auth/Signup';
import UserAgreement from '~/Screens/Setting/CustomCenter/UserAgreement';
import PersonalInfoPolicy from '~/Screens/Setting/CustomCenter/PersonalInfoPolicy';
import LocationServicePolicy from '~/Screens/Setting/CustomCenter/LocationServicePolicy';
import MarketingPolicy from '~/Screens/Auth/Signup/MarketingPolicy';
import Certification from '~/Screens/Auth/Signup/Certification';
import InputPassword from '~/Screens/Auth/Signup/InputPassword';
import InputAddress from '~/Screens/Auth/Signup/InputAddress';
import Welcome from '~/Screens/Auth/Signup/Welcome';

import ClosePrimary from '~/Assets/Icons/close_primary.svg';
import NavBack from '~/Assets/Icons/nav_back.svg';
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
  InputPassword: InputPassword,
  InputAddress: InputAddress,
  Welcome: Welcome,
};

const AuthNavigation: FC = () => {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { shadowOpacity: 0 },
        cardStyle: { backgroundColor: '#fff' },
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
              headerBackImage: () => (
                <View style={{ padding: 16 }}>
                  <NavBack width={24} height={24} />
                </View>
              ),
              headerBackTitle: ' ',
              headerRight: () => (
                <View style={{ padding: 16 }}>
                  <ClosePrimary width={24} height={24} onPress={() => console.log('Login')} />
                </View>
              ),
            }}
          />
        );
      })}
    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
