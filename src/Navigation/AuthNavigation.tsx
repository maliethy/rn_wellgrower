import 'react-native-gesture-handler';
import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '~/Screens/Auth/Login';
import Signup from '~/Screens/Auth/Signup';
import Welcome from '~/Screens/Auth/Welcome';
import FindPassword from '~/Screens/Auth/FindPassword';
import CustomCenter from '~/Screens/Auth/CustomCenter';

import { AuthScreens } from '~/@types/auth';

const AuthStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator headerMode="screen">
      <AuthStack.Screen name={AuthScreens.Login} component={Login} />
      <AuthStack.Screen name={AuthScreens.Signup} component={Signup} />
      <AuthStack.Screen name={AuthScreens.Welcome} component={Welcome} />
      <AuthStack.Screen name={AuthScreens.FindPassword} component={FindPassword} />
      <AuthStack.Screen name={AuthScreens.CustomCenter} component={CustomCenter} />
    </AuthStack.Navigator>
  );
};
export default AuthNavigation;
