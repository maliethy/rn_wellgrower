import * as React from 'react';
import { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddField from '~/Screens/MyField/AddField';
import FarmingJournal from '~/Screens/MyField/FarmingJournal';
import SearchField from '~/Screens/MyField/SearchField';
import FieldList from '~/Screens/Tabs/FieldList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyFieldStack = createStackNavigator();

const MyFieldNavigation = () => {
  return (
    <MyFieldStack.Navigator headerMode="screen" initialRouteName="FieldList">
      <MyFieldStack.Screen
        name="FieldList"
        component={FieldList}
        options={({ navigation }) => ({
          headerTitleAlign: 'center',
          headerRight: () => (
            <Ionicons
              name="add"
              size={36}
              onPress={() => {
                navigation.navigate('BaseDataTabNavigation');
              }}
            />
          ),
        })}
      />
      <MyFieldStack.Screen name="AddField" component={AddField} options={{ headerShown: false }} />

      <MyFieldStack.Screen name="FarmingJournal" component={FarmingJournal} />
      <MyFieldStack.Screen name="SearchField" component={SearchField} />
    </MyFieldStack.Navigator>
  );
};
export default MyFieldNavigation;
