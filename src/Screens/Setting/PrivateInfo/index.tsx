import * as React from 'react';
import { useState, FC } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';
import { SettingProps } from '~/@types/setting';
const PrivateInfo: FC<SettingProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('momo');
  const [phone, setPhone] = useState('010-5500-2288');
  const [address, setAddress] = useState('강동구 상암로 51길 54');

  return (
    <Container>
      <Content>
        <ListItem>
          <Body>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{userName}님</Text>
              <Text>{phone}</Text>
            </View>
          </Body>
          <Right>
            <Button light>
              <Text onPress={() => navigation.navigate('ChangePhone')}> 수정 </Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>자택주소</Text>
              <Text>{address} </Text>
            </View>
          </Body>
          <Right>
            <Button light>
              <Text
                onPress={() =>
                  navigation.navigate('ChangeAddress', { title: '자택주소 수정하기' })
                }>
                {' '}
                수정{' '}
              </Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem>
          <Body>
            <Text
              onPress={() => navigation.navigate('ChangePassword', { title: '비밀번호 변경하기' })}>
              비밀번호 변경하기
            </Text>
          </Body>
        </ListItem>
        <ListItem>
          <Body>
            <Text onPress={() => navigation.navigate('Withdrawal')}>회원탈퇴</Text>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
};
export default PrivateInfo;
