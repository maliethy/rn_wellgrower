import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import CropData from '~/Screens/MyField/BaseDataTabs/CropData';
import FarmingData from '~/Screens/MyField/BaseDataTabs/FarmingData';
import SoilData from '~/Screens/MyField/BaseDataTabs/SoilData';
import WeatherData from '~/Screens/MyField/BaseDataTabs/WeatherData';

import BaseDataTab from '~/Components/BaseDataTab';
import { Container, TabWrapper, BottomLine } from './styles';
import { Route } from '~/@types/auth';

function BaseDataTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  const [translateValue] = useState(new Animated.Value(0));
  const [width, setWidth] = useState(0);
  const [toValue, setToValue] = useState(0);
  useEffect(() => {
    return Animated.spring(translateValue, {
      toValue,
      damping: 10,
      mass: 1,
      stiffness: 100,
      overshootClamping: true,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [state, translateValue, toValue]);
  return (
    <Container>
      <TabWrapper>
        {state.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <BaseDataTab
              isFocused={isFocused}
              key={`tab_${index}`}
              label={label}
              onPress={onPress}
              setToValue={setToValue}
              setWidth={setWidth}
            />
          );
        })}
      </TabWrapper>
      <BottomLine
        as={Animated.View}
        style={{
          transform: [{ translateX: translateValue }],
          width,
        }}
      />
    </Container>
  );
}

const BaseDataTabsNavigattion = createMaterialTopTabNavigator();

export default function BaseDataTabs() {
  return (
    <BaseDataTabsNavigattion.Navigator tabBar={(props) => <BaseDataTabBar {...props} />}>
      <BaseDataTabsNavigattion.Screen
        name="Soil"
        options={{ tabBarLabel: '토양' }}
        component={SoilData}
      />
      <BaseDataTabsNavigattion.Screen
        name="Weather"
        options={{ tabBarLabel: '기상' }}
        component={WeatherData}
      />
      <BaseDataTabsNavigattion.Screen
        name="Crop"
        options={{ tabBarLabel: '작물' }}
        component={CropData}
      />
      <BaseDataTabsNavigattion.Screen
        name="Farming"
        options={{ tabBarLabel: '농작업' }}
        component={FarmingData}
      />
    </BaseDataTabsNavigattion.Navigator>
  );
}
