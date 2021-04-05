import * as React from 'react';
import { useState, useCallback, useEffect, FC } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import { SettingProps } from '~/@types/setting';

type itemProps = {
  id: string;
  title: string;
  buttonType: string;
};
const DATA: itemProps[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '알림 push 수신',
    buttonType: 'Switch',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '야간 알림 push 수신',
    buttonType: 'Switch',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '알림음',
    buttonType: 'Text',
  },
];

const SettingAlarm: FC<SettingProps> = ({ navigation, route }) => {
  const typeParams = route.params?.alarmType || '소리';
  const [isEnabled, setIsEnabled] = useState(false);
  const [isNightEnabled, setIsNightEnabled] = useState(false);
  const [alarmType, setAlarmType] = useState(typeParams);

  const toggleSwitch = useCallback(() => setIsEnabled((prev) => !prev), [isEnabled]);
  const toggleNightSwitch = useCallback(() => setIsNightEnabled((prev) => !prev), [isNightEnabled]);
  const renderItem: ListRenderItem<itemProps> = ({ item }) => (
    <Item title={item.title} buttonType={item.buttonType} />
  );

  useEffect(() => {
    typeParams && setAlarmType(typeParams);
  }, [navigation, typeParams]);

  const Item = useCallback(
    ({ title, buttonType }) => (
      <View style={styles.itemLayout}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.listRight}>
          {buttonType === 'Switch' ? (
            title === '알림 push 수신' ? (
              <Switch
                trackColor={{ false: 'yellow', true: 'orange' }}
                thumbColor={!isEnabled ? '#fff' : 'blue'}
                ios_backgroundColor="green"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            ) : (
              <Switch
                trackColor={{ false: 'yellow', true: 'orange' }}
                thumbColor={!isNightEnabled ? '#fff' : 'blue'}
                ios_backgroundColor="green"
                onValueChange={toggleNightSwitch}
                value={isNightEnabled}
              />
            )
          ) : (
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => navigation.navigate('AlarmType')}>
              <Text>{alarmType}</Text>
              <Antdesign name="right" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ),
    [isEnabled, isNightEnabled, alarmType],
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
    padding: 10,
    borderColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listRight: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
  },
});
export default SettingAlarm;
