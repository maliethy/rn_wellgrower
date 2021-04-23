import React, { useEffect } from 'react';
import { View } from 'react-native';
import { List, ListItem, Icon, Button, Text } from 'native-base';

import { resultStyles, resultSuccessStyles, resultFailureStyles } from '../styles';

export default function CertificationResult({ route, navigation }) {
  const { reqTest, user_phone, comeFrom } = route.params;
  //   const response = navigation.getParam('response') ;
  //   const phone = navigation.getParam('phone');
  console.log('comeFrom', comeFrom);

  const { success, imp_uid, merchant_uid, error_msg } = reqTest;
  //   const { success, imp_uid, merchant_uid, error_msg } = response;
  const { wrapper, title, listContainer, list, label, value } = resultStyles;

  const isSuccess = success === true;
  const { icon, btn, btnText, btnIcon } = isSuccess ? resultSuccessStyles : resultFailureStyles;
  useEffect(() => {
    comeFrom === 'Login' &&
      navigation.setOptions({
        headerTitle: '비밀번호 재설정',
      });
  }, []);
  return (
    <View style={wrapper}>
      <Icon style={icon} type="AntDesign" name={isSuccess ? 'checkcircle' : 'exclamationcircle'} />
      <Text style={title}>{`본인인증에 ${isSuccess ? '성공' : '실패'}하였습니다`}</Text>
      <List style={listContainer}>
        <ListItem style={list}>
          <Text style={label}>아임포트 번호</Text>
          <Text style={value}>{imp_uid}</Text>
        </ListItem>
        {isSuccess ? (
          <ListItem style={list}>
            <Text style={label}>주문번호</Text>
            <Text style={value}>{merchant_uid}</Text>
          </ListItem>
        ) : (
          <ListItem style={list}>
            <Text style={label}>에러메시지</Text>
            <Text style={value}>{error_msg}</Text>
          </ListItem>
        )}
      </List>
      <Button
        bordered
        transparent
        style={btn}
        onPress={() => {
          comeFrom === 'Login'
            ? navigation.navigate('FindPassword')
            : navigation.navigate('InputPassword', { user_phone: user_phone });
        }}>
        <Icon name="arrow-back" style={btnIcon} />
        <Text style={btnText}>돌아가기</Text>
      </Button>
    </View>
  );
}
