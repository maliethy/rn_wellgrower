import 'react-native-gesture-handler';
import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import MyFieldNavigation from './MyFieldNavigation';
import BaseDataTabNavigation from './BaseDataTabNavigation';

const homeStack = {
  TabNavigation: TabNavigation,
  MyFieldNavigation: MyFieldNavigation,
  BaseDataTabNavigation: BaseDataTabNavigation,
};
const HomeStackNavigation = createStackNavigator();

export default () => {
  return (
    <HomeStackNavigation.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
      }}>
      {Object.entries({
        ...homeStack,
      }).map(([name, component]) => {
        return <HomeStackNavigation.Screen key={name} name={name} component={component} />;
      })}
    </HomeStackNavigation.Navigator>
  );
};
