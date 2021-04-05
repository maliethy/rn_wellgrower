import React, { useState, FC } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { itemProps, ItemComponentProps } from '~/@types/setting';
const DATA = [
  {
    id: 1,
    title: '공지사항',
    screenName: 'Notice',
  },
  {
    id: 2,
    title: '버전 정보',
    screenName: 'VersionInfo',
  },
  {
    id: 3,
    title: '계정 정보',
    screenName: 'PrivateInfo',
  },
  {
    id: 4,
    title: '알림',
    screenName: 'SettingAlarm',
  },
  {
    id: 5,
    title: '고객센터/도움말',
    screenName: 'CustomCenter',
  },
  {
    id: 6,
    title: '로그아웃',
    screenName: 'Logout',
  },
];

const Item: FC<ItemComponentProps> = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const SettingList: FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigation = useNavigation();
  const renderItem = ({ item }: ItemComponentProps) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate(item.screenName);
        }}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}${item.title}`}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
});

export default SettingList;
