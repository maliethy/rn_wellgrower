import * as React from 'react';
import { useState, FC } from 'react';
import { View } from 'react-native';
import {
  Container,
  List,
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

const CustomCenter: FC<SettingProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('momo');
  const [phone, setPhone] = useState('010-5500-2288');
  const [address, setAddress] = useState('강동구 상암로 51길 54');

  return (
    <Container>
      <Content>
        <List>
          <ListItem selected onPress={() => navigation.navigate('Help')}>
            <Left>
              <Text>도움말</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('Consult')}>
            <Left>
              <Text>문의하기</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>약관 및 정책</Text>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('Agreement')}>
            <Left>
              <Text>이용약관</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('PersonalInfoPolicy')}>
            <Left>
              <Text>개인정보 처리방침</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('LocationServicePolicy')}>
            <Left>
              <Text>위치기반서비스 이용약관</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('OperationPolicy')}>
            <Left>
              <Text>운영정책</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>회사소개</Text>
          </ListItem>
          <ListItem>
            <Left>
              <Text>상호 AIS</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};
export default CustomCenter;
