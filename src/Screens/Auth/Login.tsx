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
  TouchableOpacity,
  Keyboard,
  TextInput,
  Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '~/utils/fetcher';
import produce from 'immer';
import useInput from '~/Utils/useInput';
import GoToButton from '~/Components/GoToButton';
import { CloseButtonCoord } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { LoginProps, Route } from '~/@types/auth';

// const back_url = "http://192.168.0.20:3000/api";
const LogIn: FC<LoginProps> = ({ route, navigation }): ReactElement => {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );:

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };

  const [email, onChangeEmail, onResetEmail, setEmail] = useInput('');

  const [password, onChangePassword, onResetPassword, setPassword] = useInput('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [misMatchError, setMisMatchError] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [toggleCheckBox, setToggleCheckbox] = useState(true);
  const onToggleCheckbox = useCallback(
    (prev) => {
      setToggleCheckbox(prev);
    },
    [toggleCheckBox],
  );
  const onSubmit = useCallback(async () => {
    try {
      // const emailRegex = /^(([^<>()\[\]\\.,;:\s~"]+(\.[^<>()\[\]\\.,;:\s~"]+)*)|(".+"))~((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // if (!email || !email.trim()! || !emailRegex.test(email)!) {
      //   return setErrorEmail('유효하지 않은 이메일입니다.');
      // }

      if (!password || !password.trim()!) {
        return setErrorPassword('패스워드를 입력해 주세요.');
      }
      // mutateUser(
      //   produce((draft) => {
      //     draft.push({ id: 2 });

      //     return draft;
      //   }),
      //   false
      // ).then(() => {
      //   console.log(userData);

      // });

      // if (userToken) {
      //   setIsLoggedIn(true);
      // }
      // navigation.navigate("근무시간");

      setEmail('');
      setPassword('');
      setErrorEmail('');
      setErrorPassword('');
    } catch (err) {
      console.dir(err);
    }
  }, [email, password]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  // if (userData === undefined) {
  //   return <Loader />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formLayout}>
          <View style={styles.rowstyle}>
            <TextInput
              style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
              value={email}
              onChangeText={onChangeEmail}
              keyboardType={'email-address'}
              autoCorrect={false}
              placeholder="이메일"
              ref={ref_input[0]}
              onSubmitEditing={() => onFocusNext(0)}
              // errorMessage={errorEmail}
              clearTextOnFocus={true}
              autoCapitalize={'none'}
            />
            <CloseButtonCoord>
              {email && (
                <AntDesign name="closecircle" color="grey" size={16} onPress={onResetEmail} />
              )}
            </CloseButtonCoord>
          </View>
          <View style={styles.rowstyle}>
            <TextInput
              style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
              value={password}
              onChangeText={onChangePassword}
              ref={ref_input[1]}
              onSubmitEditing={() => onFocusNext(1)}
              autoCorrect={false}
              // errorMessage={errorPassword}
              // rightIcon={{
              //   type: 'antdesign',
              //   name: isSecureText ? 'eye' : 'eyeo',
              //   onPress: () => setIsSecureText((prev) => !prev),
              // }}
              placeholder="비밀번호"
              autoCapitalize={'none'}
              secureTextEntry={isSecureText}
            />
            <CloseButtonCoord>
              {password && (
                <AntDesign name="closecircle" color="grey" size={16} onPress={onResetPassword} />
              )}
            </CloseButtonCoord>
          </View>
          <View style={styles.checkboxRowStyle}>
            <CheckBox
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              boxType="square"
              disabled={false}
              value={toggleCheckBox}
              onValueChange={onToggleCheckbox}
            />
            <Text>자동 로그인</Text>
          </View>
          <View>
            {misMatchError && (
              <Text style={styles.buttonText}>이메일 또는 비밀번호가 일치하지 않습니다.</Text>
            )}
          </View>
          <View style={styles.buttonAreaLayout}>
            <Button onPress={onSubmit} title="로그인" />
          </View>
          <View style={styles.rowstyle}>
            <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
              <Text style={styles.registerInfo}>비밀번호 찾기</Text>
            </TouchableOpacity>
            <View style={styles.borderContainer}>
              <View style={styles.borderDivider} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.registerInfo}>회원가입</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('CustomCenter')}>
            <Text style={styles.registerInfo}>로그인에 문제가 생겼나요?</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  checkboxRowStyle: {
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

export default LogIn;
