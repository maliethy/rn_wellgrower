import 'react-native-gesture-handler';
import * as React from 'react';
import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '~/Screens/Auth/Login';
import Welcome from '~/Screens/Auth/Welcome';
import FindPassword from '~/Screens/Auth/FindPassword';
import CustomCenter from '~/Screens/Auth/CustomCenter';

import Signup from '~/Screens/Auth/Signup';
import Certification from '~/Screens/Auth/Signup/Certification';
import UserAgreement from '~/Screens/Setting/CustomCenter/UserAgreement';
import PersonalInfoPolicy from '~/Screens/Setting/CustomCenter/PersonalInfoPolicy';
import { AuthScreens } from '~/@types/auth';

const AuthStack = createStackNavigator();

const authScreens = {
  Login: Login,
  Welcome: Welcome,
  FindPassword: FindPassword,
  CustomCenter: CustomCenter,
};
const signupScreens = {
  Signup: Signup,
  Certification: Certification,
  UserAgreement: UserAgreement,
  PersonalInfoPolicy: PersonalInfoPolicy,
};

const AuthNavigation: FC = () => {
  return (
    <AuthStack.Navigator headerMode="screen" initialRouteName="Login">
      {Object.entries({
        ...authScreens,
        ...signupScreens,
      }).map(([name, component]) => {
        return <AuthStack.Screen key={name} name={name} component={component} />;
      })}
    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
