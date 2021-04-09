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
  Platform,
  Image,
} from 'react-native';

import axios from 'axios';
import useSWR from 'swr';
import fetcher from '~/utils/fetcher';
import produce from 'immer';
import useInput from '~/Utils/useInput';
import BasicButton from '~/Components/BasicButton';
import BasicText from '~/Components/BasicText';
import CheckBlue from '~/Assets/Icons/check_blue.svg';
import CheckRed from '~/Assets/Icons/close_red.svg';
import VisibilityOff from '~/Assets/Icons/visibility_off.svg';
import { InputIconCoord } from '~/styles';
import color from '~/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import { Container, Content, Item, Input, Icon } from 'native-base';
import SquareCheckbox from '~/Components/SquareCheckbox';
// const back_url = "http://192.168.0.20:3000/api";
const LogIn: FC<AuthProps> = ({ navigation }): ReactElement => {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );

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

  const [phone, onChangePhone, onResetPhone, setPhone] = useInput('');

  const [password, onChangePassword, onResetPassword, setPassword] = useInput('');
  const [AccountLock, setAccountLock] = useState(false);

  const [misMatchError, setMisMatchError] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  function autoHypenTel(str: string): string | unknown {
    str = phone.replace(/[^0-9]/g, '');
    let tmp = '';

    if (str.charAt(2) === '1') {
      if (str.length < 4) {
        return str;
      } else if (str.length < 7) {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3);
        return setPhone(tmp);
      } else if (str.length < 11) {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3, 6);
        tmp += '-';
        tmp += str.substring(6);
        return setPhone(tmp);
      } else {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3, 7);
        tmp += '-';
        tmp += str.substring(7);
        return setPhone(tmp);
      }
    } else if (str.charAt(2) === '0') {
      if (str.length < 4) {
        return str;
      } else if (str.length < 7) {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3);
        return setPhone(tmp);
      } else if (str.length < 11) {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3, 6);
        tmp += '-';
        tmp += str.substring(6);
        return setPhone(tmp);
      } else {
        tmp += str.substring(0, 3);
        tmp += '-';
        tmp += str.substring(3, 7);
        tmp += '-';
        tmp += str.substring(7);
        return setPhone(tmp);
      }
    }
    return str;
  }
  useEffect(() => {
    autoHypenTel(phone);
  }, [phone]);

  const onSubmit = useCallback(async () => {
    try {
      setPhone('');
      setPassword('');
    } catch (err) {
      console.dir(err);
    }
  }, [phone, password]);
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
        <View style={styles.container}>
          <View style={styles.logoLayout}>
            <Image style={styles.logo} source={require('~/Assets/Icons/logo.png')} />
          </View>
          <View style={styles.formLayout}>
            <View style={[styles.inputRowstyle, { marginBottom: 44 }]}>
              <TextInput
                style={styles.inputStyle}
                value={phone}
                onChangeText={onChangePhone}
                keyboardType={'numeric'}
                autoCorrect={false}
                placeholder="전화번호"
                placeholderTextColor={color.GrayscaleDisabledText}
                ref={ref_input[0]}
                onSubmitEditing={() => onFocusNext(0)}
                clearTextOnFocus={true}
                autoCapitalize={'none'}
              />
              <InputIconCoord>
                {(phone.charAt(2) === '1' && 12 <= phone.length && phone.length < 14) ||
                (phone.charAt(2) === '0' && 12 <= phone.length && phone.length < 14) ? (
                  <CheckBlue width={24} height={24} />
                ) : phone.length > 0 ? (
                  <CheckRed width={24} height={24} />
                ) : null}
              </InputIconCoord>
            </View>

            <View style={styles.inputRowstyle}>
              <TextInput
                style={styles.inputStyle}
                value={password}
                onChangeText={onChangePassword}
                ref={ref_input[1]}
                onSubmitEditing={() => onFocusNext(1)}
                autoCorrect={false}
                placeholder="비밀번호"
                placeholderTextColor={color.GrayscaleDisabledText}
                autoCapitalize={'none'}
                secureTextEntry={isSecureText}
              />
              <InputIconCoord>
                <VisibilityOff width={24} height={24} />
              </InputIconCoord>
            </View>

            <View>
              <SquareCheckbox />
              <Text onPress={() => navigation.navigate('FindPassword')}>비밀번호 찾기</Text>
            </View>
            {/* <View>
              {misMatchError && (
                <Text style={styles.buttonText}>이메일 또는 비밀번호가 일치하지 않습니다.</Text>
              )}
            </View> */}
            <View style={styles.infoLayout}>
              <View style={styles.buttonAreaLayout}>
                <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
              </View>
              <View style={styles.inputRowstyle}>
                <TouchableOpacity style={{ marginRight: 3 }}>
                  <BasicText text="아직 계정이 없어요" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <BasicText bold text="회원가입" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 72,
    height: 72,
  },
  logoLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLayout: {
    padding: 16,
    flex: 2,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.6,
    borderBottomWidth: 1,
    borderColor: color.GrayscaleLine,
    padding: 3,
  },
  infoLayout: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },

  rowstyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputRowstyle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },

  buttonAreaLayout: {
    fontSize: 50,
    marginBottom: 36,
    padding: 16,
    fontFamily: 'NanumGothic-Regular',
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
});

export default LogIn;
