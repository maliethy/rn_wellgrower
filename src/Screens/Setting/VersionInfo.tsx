import * as React from 'react';
import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { CircleView } from './styles';
const VersionInfo = () => {
  const [isLatest, setIsLatest] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('0.0.1');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <CircleView />
        {isLatest ? (
          <Text>최신 버전을 사용 중입니다</Text>
        ) : (
          <Text>{currentVersion} 버전을 사용 중입니다</Text>
        )}
        <Text>현재버전 {currentVersion}</Text>
        {!isLatest && <Button title="업데이트 하기" onPress={() => console.warn('update')} />}
      </View>
      <View style={styles.footContainer}>
        <Text>지원환경 Android 10 이상</Text>
      </View>
    </SafeAreaView>
  );
};
export default VersionInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
