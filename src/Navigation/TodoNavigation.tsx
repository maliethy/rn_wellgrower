import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Community from '~/Screens/Tabs/Community';

const TodoNavigation = createStackNavigator();

const communityScreens = {
  Community: Community,
};

export default () => {
  return (
    <TodoNavigation.Navigator headerMode="">
      {Object.entries({
        ...communityScreens,
      }).map(([name, component]) => {
        <TodoNavigation name={name} component={component} />;
      })}
    </TodoNavigation.Navigator>
  );
};
