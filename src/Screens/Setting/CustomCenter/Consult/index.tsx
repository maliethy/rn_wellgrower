import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const Consult = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={{ margin: 10, marginBottom: 20, justifyContent: 'flex-start' }}>
        <Text>
          {' '}
          안녕하세요.{'\n'} 잘키움 고객센터입니다.{'\n'} 무엇을 도와드릴까요?
        </Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: 'skyblue', padding: 10, margin: 10, width: '90%' }}
        onPress={() => navigation.navigate('ConsultForm')}>
        <Text>1:1 문의하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Consult;
