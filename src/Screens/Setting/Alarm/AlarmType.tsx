import * as React from 'react';
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '소리',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '진동',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '무음',
  },
];

const AlarmType = ({ navigation }) => {
  const renderItem = ({ item }) => <Item title={item.title} />;
  const Item = ({ title }) => (
    <TouchableOpacity style={styles.itemLayout} onPress={onChangeAlarmType(title)}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
  const onChangeAlarmType = useCallback(
    (title) => () =>
      navigation.dispatch(
        CommonActions.navigate({
          name: 'SettingAlarm',
          params: {
            alarmType: title,
          },
        }),
      ),
    [navigation],
  );
  return (
    <SafeAreaView>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLayout: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  listRight: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
  },
});
export default AlarmType;
