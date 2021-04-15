import React, {
  FC,
  ReactElement,
  RefObject,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  TextInput,
  Button,
} from 'react-native';

import CheckBox from 'react-native-check-box';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '~/utils/fetcher';
import produce from 'immer';
import useInput from '~/Utils/useInput';
import GoToButton from '~/Components/GoToButton';
import { CloseButtonCoord, CloseButtonCoordForTextArea } from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { LoginNavigationProps, LoginProps, Route } from '~/@types/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { Directions } from 'react-native-gesture-handler';
// const back_url = "http://192.168.0.20:3000/api";
function ConsultForm({
  route,
  navigation,
}: {
  route: Route;
  navigation: LoginNavigationProps;
}): ReactElement {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );:

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);
  ref_input[3] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };

  const [selectedConsultType, setSelectedConsultType] = useState(null);
  const [emailId, onChangeEmailId, onResetEmailId, setEmailId] = useInput('');
  const [directInput, onChangeDirectInput, onResetDirectInput, setDirectInput] = useState(null);
  const [emailAddress, setEmailAddress] = useState(null);
  const [title, onChangeTitle, onResetTitle, setTitle] = useInput('');
  const [content, onChangeContent, onResetContent, setContent] = useInput('');

  const [errorSelectedConsultType, setErrorSelectedConsultType] = useState(false);
  const [errorEmailId, setErrorEmailId] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorContent, setErrorContent] = useState('');

  const onSubmit = useCallback(async () => {
    try {
      // const emailRegex = /^(([^<>()\[\]\\.,;:\s~"]+(\.[^<>()\[\]\\.,;:\s~"]+)*)|(".+"))~((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // if (!selectedConsultType || !selectedConsultType.trim()!) {
      //   return setErrorSelectedConsultType(true);
      // }

      // if (!emailId || !emailId.trim()!) {
      //   return setErrorEmailId('유효하지 않은 이메일입니다.');
      // }
      // if (!emailAddress || !emailAddress.trim()!) {
      //   return setErrorEmailAddress('제목을 입력해 주세요.');
      // }

      // if (!title || !title.trim()!) {
      //   return setErrorTitle('제목을 입력해 주세요.');
      // }

      // if (!content || !content.trim()!) {
      //   return setErrorContent('문의사항을 입력해 주세요.');
      // }
      console.log(selectedConsultType, emailId, emailAddress, title, content);

      Alert.alert('문의가 접수되었습니다.');
      navigation.navigate('Consult');
      setSelectedConsultType(null);
      setEmailId('');
      setEmailAddress(null);
      setTitle('');
      setContent('');
    } catch (err) {
      console.dir(err);
    }
  }, [selectedConsultType, emailId, emailAddress, title, content]);

  useEffect(() => {
    if (emailAddress === '직접입력') {
      ref_input[1].current?.focus();
    }
  }, [emailAddress]);
  // if (userData === undefined) {
  //   return <Loader />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formLayout}>
          <View
            style={{
              position: 'relative',
              zIndex: 100,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>문의 분류</Text>
            <DropDownPicker
              containerStyle={{ height: 40 }}
              placeholder="선택"
              items={[
                { label: '작물', value: '작물' },
                { label: '서비스', value: '서비스' },
              ]}
              selectedLabelStyle={{
                color: '#39739d',
              }}
              activeLabelStyle={{ color: 'orange' }}
              defaultValue={selectedConsultType}
              onChangeItem={(item) => {
                console.log('consulttype:', item.value);
                setSelectedConsultType(item.value);
              }}
              // multiple={true}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownMaxHeight={200}
              // labelStyle={{ fontSize: 14, textAlign: 'left', color: '#000' }}
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                width: 200,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              selectedLabelStyle={{
                color: '#39739d',
              }}
            />
          </View>
          <View
            style={{
              position: 'relative',
              zIndex: 10,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>이메일</Text>

            <TextInput
              style={{
                flex: 0.5,
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                marginLeft: 15,
              }}
              value={emailId}
              onChangeText={onChangeEmailId}
              keyboardType={'email-address'}
              autoCorrect={false}
              ref={ref_input[0]}
              onSubmitEditing={() => onFocusNext(0)}
              // clearTextOnFocus={true}
              autoCapitalize={'none'}
            />

            <Text>@</Text>
            <TextInput
              style={{
                flex: 0.5,
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
              }}
              placeholder="직접입력"
              value={directInput}
              onChangeText={onChangeDirectInput}
              keyboardType={'email-address'}
              autoCorrect={false}
              ref={ref_input[1]}
              onSubmitEditing={() => onFocusNext(1)}
              autoCapitalize={'none'}
            />
            <CloseButtonCoord>
              {directInput && (
                <AntDesign
                  name="closecircle"
                  color="grey"
                  size={'16@ms0.3'}
                  onPress={onResetDirectInput}
                />
              )}
            </CloseButtonCoord>
            <DropDownPicker
              containerStyle={{ height: 40 }}
              placeholder="선택"
              items={[
                { label: '직접입력', value: '직접입력' },
                { label: 'naver.com', value: 'naver.com' },
                { label: 'gmail.com', value: 'gmail.com' },
                { label: 'nate.com', value: 'nate.com' },
                { label: 'hanmail.net', value: 'hanmail.com' },
                { label: 'daum.net', value: 'daum.com' },
              ]}
              defaultValue={emailAddress}
              onChangeItem={(item) => {
                console.log('emailAddress:', item.value);
                setEmailAddress(item.value);
              }}
              // multiple={true}

              selectedLabelStyle={{
                color: '#39739d',
              }}
              activeLabelStyle={{ color: 'orange' }}
              itemStyle={{
                justifyContent: 'flex-start',
                backgroundColor: '#fff',
              }}
              dropDownMaxHeight={200}
              // labelStyle={{ fontSize: 14, textAlign: 'left', color: '#000' }}
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                width: 90,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />
          </View>

          <View style={styles.rowstyle}>
            <Text>제목</Text>
            <TextInput
              style={{ flex: 0.7, borderWidth: 1, borderColor: 'gray', padding: 10 }}
              value={title}
              onChangeText={onChangeTitle}
              ref={ref_input[2]}
              onSubmitEditing={() => onFocusNext(2)}
              autoCorrect={false}
              // errorMessage={errorPassword}
              // rightIcon={{
              //   type: 'antdesign',
              //   name: isSecureText ? 'eye' : 'eyeo',
              //   onPress: () => setIsSecureText((prev) => !prev),
              // }}

              autoCapitalize={'none'}
            />
            <CloseButtonCoord>
              {title && (
                <AntDesign
                  name="closecircle"
                  color="grey"
                  size={'16@ms0.3'}
                  onPress={onResetTitle}
                />
              )}
            </CloseButtonCoord>
          </View>
          <View style={styles.rowstyle}>
            <Text>내용</Text>
            <TextInput
              style={{
                flex: 0.7,
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                height: 100,
              }}
              value={content}
              onChangeText={onChangeContent}
              ref={ref_input[3]}
              onSubmitEditing={() => onFocusNext(3)}
              autoCorrect={false}
              multiline={true}
              // errorMessage={errorPassword}
              // rightIcon={{
              //   type: 'antdesign',
              //   name: isSecureText ? 'eye' : 'eyeo',
              //   onPress: () => setIsSecureText((prev) => !prev),
              // }}

              autoCapitalize={'none'}
            />
            <CloseButtonCoordForTextArea>
              {content && (
                <AntDesign
                  name="closecircle"
                  color="grey"
                  size={'16@ms0.3'}
                  onPress={onResetContent}
                />
              )}
            </CloseButtonCoordForTextArea>
          </View>
          {!selectedConsultType || !emailId || !emailAddress || !title || !content ? (
            <View style={styles.buttonAreaLayout}>
              <Text>값을 모두 넣어주세요</Text>
            </View>
          ) : (
            <View style={styles.buttonAreaLayout}>
              <Button onPress={onSubmit} title="보내기" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  formLayout: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },

  inputLayout: {
    padding: 10,
    fontSize: 20,
  },
  registerInfo: {
    fontSize: 16,
    textAlign: 'center',
  },
  anotherInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  rowstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkboxstyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
    marginBottom: 16,
  },
  buttonAreaLayout: {
    fontSize: 20,
    marginBottom: 36,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  borderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  borderDivider: {
    borderRightWidth: 1,
    flex: 0.7,
    borderColor: '#000',
  },
});

export default ConsultForm;
