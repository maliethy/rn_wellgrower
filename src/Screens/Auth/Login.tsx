import React, { FC, ReactElement, useState, useRef, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
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
import fetcherGet from '~/Utils/fetcher';
import back_url from '~/config/config';
import produce from 'immer';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { ScaledSheet } from 'react-native-size-matters';
import useInput from '~/Utils/useInput';
import autoHypenTel from '~/Utils/autoHypenTel';
import BasicButton from '~/Components/BasicButton';
import BasicText from '~/Components/BasicText';
import BasicModal from '~/Components/BasicModal';
import CheckBlue from '~/Assets/Icons/check_blue.svg';
import CheckRed from '~/Assets/Icons/close_red.svg';
import VisibilityOn from '~/Assets/Icons/visibility_on.svg';
import VisibilityOff from '~/Assets/Icons/visibility_off.svg';
import { InputIconCoord } from '~/styles';
import color from '~/styles';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import SquareCheckbox from '~/Components/SquareCheckbox';

const LogIn: FC<AuthProps> = ({ navigation }): ReactElement => {
  const { data: userData, error, revalidate, mutate } = useSWR(`${back_url}/user`, fetcherGet, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  });

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
  const { setItem: setAT } = useAsyncStorage('accessToken');
  const { setItem: setRT } = useAsyncStorage('refreshToken');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const [phone, onChangePhone, onResetPhone, setPhone] = useInput('');
  const [password, onChangePassword, onResetPassword, setPassword] = useInput('');
  const [accountLock, setAccountLock] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [toggleCheckboxAutoLogin, setToggleCheckboxAutoLogin] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const onToggleCheckboxAutoLogin = useCallback(() => {
    setToggleCheckboxAutoLogin((prev) => !prev);
  }, []);

  useEffect(() => {
    autoHypenTel(phone, phone, setPhone);
    if (
      phone.length === 0 ||
      (phone.charAt(2) === '1' && 12 <= phone.length && phone.length < 14) ||
      (phone.charAt(2) === '0' && 12 <= phone.length && phone.length < 14)
    ) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  }, [phone]);

  const writeAccessTokenToStorage = async (newValue: string) => {
    await setAT(newValue);
    setAccessToken(newValue);
  };

  const writeRefreshTokenToStorage = async (newValue: string) => {
    await setRT(newValue);
    setRefreshToken(newValue);
  };

  useEffect(() => {
    if (userData) {
      writeAccessTokenToStorage();
      writeRefreshTokenToStorage();
    }
  }, []);
  const onSubmit = useCallback(async () => {
    try {
      // setAccountLock(true);
      // setLoginError(true);
      if (!accessToken) {
        axios
          .post(`${back_url}/v1/auth/login`, {
            user_phone: phone,
            user_pswd: password,
          })
          .then((res) => {
            revalidate();
          })
          .catch((err) => {
            setLoginError(err.response?.data?.statusCode === 422);
          });
      } else {
        axios
          .post(`${back_url}/v1/auth/login`, {
            user_phone: phone,
            user_pswd: password,
            token: accessToken,
          })
          .then((res) => {
            revalidate();
          })
          .catch((err) => {
            setLoginError(err.response?.data?.statusCode === 422);
          });
      }

      setPhone('');
      setPassword('');
      setPhoneError(false);

      toggleCheckboxAutoLogin && console.log('auto login');
    } catch (err) {
      console.dir(err);
    }
  }, [phone, password]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    loginError || accountLock ? setModalVisible(true) : setModalVisible(false);
  }, [loginError, accountLock]);

  // if (userData === undefined) {
  //   return <Loader />;
  // }
  return (
    <KeyboardAvoidingView
      // keyboardVerticalOffset={-500}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoLayout}>
            <Image style={styles.logo} source={require('~/Assets/Icons/logo.png')} />
          </View>
          <View style={styles.formLayout}>
            <View style={[styles.inputRowstyle]}>
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
                autoCapitalize={'none'}
                returnKeyType={'next'}
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
            {phoneError && (
              <Text style={{ color: color.StatusFail }}>올바르지 않은 형식입니다</Text>
            )}

            <View style={[styles.inputRowstyle, { marginTop: 44, marginBottom: 18 }]}>
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
                returnKeyType={'done'}
              />
              <InputIconCoord>
                <TouchableOpacity
                  style={{ width: 24, height: 24 }}
                  onPress={() => setIsSecureText((prev) => !prev)}>
                  {isSecureText ? (
                    <VisibilityOff width={24} height={24} />
                  ) : (
                    <VisibilityOn width={24} height={24} />
                  )}
                </TouchableOpacity>
              </InputIconCoord>
            </View>

            <View style={styles.checkboxRow}>
              <SquareCheckbox
                isChecked={toggleCheckboxAutoLogin}
                onToggleCheckbox={onToggleCheckboxAutoLogin}
                text="자동로그인"
              />
              <BasicText onPress={() => navigation.navigate('FindPassword')} text="비밀번호 찾기" />
            </View>

            <View style={styles.infoLayout}>
              <View style={styles.buttonAreaLayout}>
                {!phoneError && password && phone.trim() && password.trim() ? (
                  <BasicButton onPress={onSubmit} title="로그인" />
                ) : (
                  <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
                )}
              </View>
              <View style={styles.inputRowstyle}>
                <TouchableOpacity style={{ marginRight: 3 }}>
                  <BasicText text="아직 계정이 없어요" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <BasicText bold={true} text="회원가입" color={color.PrimaryLight} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {loginError && (
            <BasicModal
              title="로그인 오류"
              text="전화번호 또는 비밀번호가 올바르지 않습니다"
              buttonText="다시시도"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
          {accountLock && (
            <BasicModal
              title="로그인 오류"
              text="N회 입력 오류로 계정이 잠겼습니다"
              buttonText="계정 잠금 해제"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: '72@s',
    height: '72@vs',
  },
  logoLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formLayout: {
    padding: '16@s',
    // padding: 16,
    flex: 2,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.6,
    borderBottomWidth: 1,
    // borderColor: color.StatusFail,
    borderColor: color.GrayscaleLine,
    padding: '3@s',
    color: '#000',
  },
  infoLayout: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 50,
  },
  checkboxRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 64 },

  inputRowstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 2,
  },
  buttonAreaLayout: {
    marginBottom: '36@vs',
  },
});

export default LogIn;
