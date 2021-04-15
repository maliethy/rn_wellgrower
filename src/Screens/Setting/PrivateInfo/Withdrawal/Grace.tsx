import * as React from 'react';
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WithdrawalGrace = ({ navigation }) => {
  const [withdrawalGrace, setWithdrawalGrace] = useState(7);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>회원 탈퇴 완료되었습니다.</Text>
      <Text style={styles.textStyle}>유예기간</Text>
      <Text style={styles.textStyle}>{withdrawalGrace}일</Text>
      <Text style={styles.textStyle}>남았습니다.</Text>
      <Button
        title="탈퇴취소 로그인 하러가기"
        onPress={() => {
          //로그아웃 요청보내기
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 5,
  },
});
export default WithdrawalGrace;
