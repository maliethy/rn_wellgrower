/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { ReactElement, FC } from 'react';
import { Platform, LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import AlarmList from '~/Screens/Tabs/AlarmList';
import Community from '~/Screens/Tabs/Community';
import SettingNavigation from './SettingNavigation';
import MyFieldNavigation from './MyFieldNavigation';
import Home from '~/Screens/Tabs/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
const TabItemStackNavigation = createStackNavigator();

type TabItemParams = {
  initialRoute: () => ReactElement;
  customConfig?: undefined;
};
interface TabItemStackProps {
  route: { params: TabItemParams; name: string };
  navigation: undefined;
}
const TabItemStack = ({ route, navigation }: TabItemStackProps) => {
  const { initialRoute, customConfig } = route.params;

  return (
    <TabItemStackNavigation.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <TabItemStackNavigation.Screen name={route.name} component={initialRoute} />
    </TabItemStackNavigation.Navigator>
  );
};

const BottomTabNavigation = createBottomTabNavigator();

const TabNavigation: FC = () => {
  const TabBarIcon = (focused: boolean, name: string) => {
    let iconName = '';

    if (name === 'Home') {
      iconName = 'ios-home';
    } else if (name === 'Community') {
      iconName = 'ios-person';
    } else if (name === 'MyFieldNavigation') {
      iconName = 'ios-add';
    } else if (name === 'AlarmList') {
      iconName = 'ios-alarm';
    } else if (name === 'SettingNavigation') {
      iconName = 'ios-settings-outline';
    }
    const iconSize = focused ? 34 : 24;
    const iconColor = focused ? '#000' : 'gray';
    return <Ionicons size={iconSize} name={iconName} color={iconColor} />;
  };
  return (
    <BottomTabNavigation.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => TabBarIcon(focused, route.name),
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        style: { height: Platform.OS === 'ios' ? 80 : 60 },
      }}>
      <BottomTabNavigation.Screen
        name="Home"
        component={TabItemStack}
        initialParams={{
          initialRoute: Home,
          customConfig: {
            title: 'Home',
          },
        }}
      />
      <BottomTabNavigation.Screen
        name="Community"
        component={TabItemStack}
        initialParams={{
          initialRoute: Community,
        }}
      />
      <BottomTabNavigation.Screen
        name="MyFieldNavigation"
        component={MyFieldNavigation}
        // initialParams={{
        //   initialRoute: FieldList,
        // }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('MyFieldNavigation');
          },
        })}
      />

      <BottomTabNavigation.Screen
        name="AlarmList"
        component={TabItemStack}
        initialParams={{
          initialRoute: AlarmList,
          customConfig: {
            title: 'AlarmList',
          },
        }}
      />
      <BottomTabNavigation.Screen
        name="SettingNavigation"
        component={SettingNavigation}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('SettingNavigation');
          },
        })}
      />
    </BottomTabNavigation.Navigator>
  );
};
export default TabNavigation;
