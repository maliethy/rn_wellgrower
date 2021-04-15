import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button, Linking } from 'react-native';
import { CircleView } from './styles';
import VersionCheck from 'react-native-version-check';
const VersionInfo = () => {
  const [isLatest, setIsLatest] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('0.0.1');
  // useEffect(() => {
  //   VersionCheck.getLatestVersion().then((latestVersion) => {
  //     console.log(latestVersion);
  //     // setCurrentVersion(latestVersion)
  //   });
  //   VersionCheck.needUpdate().then(async (res) => {
  //     console.log(res.isNeeded);
  //     //  setIsLatest(res.isNeeded)
  //     if (res.isNeeded) {
  //       Linking.openURL(res.storeUrl); // open store if update is needed.
  //     }
  //   });
  // }, [currentVersion, isLatest]);

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
    width: '100%',
    height: '100%',
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
