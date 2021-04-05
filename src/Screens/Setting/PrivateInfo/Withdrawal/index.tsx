import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';

const Withdrawal = ({ navigation }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    Alert.alert(
      '정말 탈퇴하시겠습니까?',
      '탈퇴하실 경우 고객정보가 삭제되어 서비스 이용이 제한될 수 있습니다',
      [
        {
          text: '예',
          onPress: () => navigation.navigate('WithdrawalReason'),
          style: 'cancel',
        },
        {
          text: '아니오',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
      },
    );
  }, [showAlert]);
  return <View></View>;
};
export default Withdrawal;
