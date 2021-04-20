import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Postcode from 'react-native-daum-postcode';

function PostcodeModal({ route, navigation }) {
  const { comeFrom } = route.params;

  const [postcode, setPostcode] = useState<number | null>(null);
  const [addr, setAddr] = useState('');
  const [extraAddr, setExtraAddr] = useState('');

  useEffect(() => {
    if (postcode) {
      navigation.navigate(comeFrom, {
        postcode: postcode,
        addr: addr,
        extraAddr: extraAddr,
      });
    }
  }, [postcode, addr, extraAddr]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Postcode
        style={{ width: 400, height: 200 }}
        jsOptions={{ animation: true }}
        onSelected={(data) => {
          setAddr('');
          setExtraAddr('');
          setPostcode(data.zonecode);
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            setAddr(data.roadAddress);

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              setExtraAddr(data.bname);
              // 건물명이 있고, 공동주택일 경우 추가한다.

              if (data.buildingName !== '' && data.apartment === 'Y') {
                setExtraAddr((prev) => {
                  return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                });
              }
            } else {
              setExtraAddr('');
            }
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            setExtraAddr(data.jibunAddress);
          }
        }}
        onError={(err) => console.dir(err)}
      />
    </View>
  );
}
export default PostcodeModal;
