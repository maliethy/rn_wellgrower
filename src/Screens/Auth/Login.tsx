import React, { FC, ReactElement, useState, useRef, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Alert,
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
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const [toggleCheckboxAutoLogin, setToggleCheckboxAutoLogin] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const phoneLengthChecked =
    (phone.charAt(2) === '1' && 12 <= phone.length && phone.length < 14) ||
    (phone.charAt(2) === '0' && 12 <= phone.length && phone.length < 14);
  const onToggleCheckboxAutoLogin = useCallback(() => {
    setToggleCheckboxAutoLogin((prev) => !prev);
  }, []);
  const phoneValidation = useCallback(() => {
    if (!phone || !phone.trim() || !phoneLengthChecked) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }, [phone, phoneLengthChecked]);
  const passwordValidation = useCallback(() => {
    if (!password || !password.trim()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);
  useEffect(() => {
    autoHypenTel(phone, phone, setPhone);
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
  const [keyboardH, setKeyboardH] = useState(0);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [Keyboard]);
  const _keyboardDidShow = (e: { endCoordinates: { height: number } }) => {
    setKeyboardH(e.endCoordinates.height);
  };
  const _keyboardDidHide = () => {
    setKeyboardH(0);
  };
  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    logo: {
      width: '72@s',
      height: '72@vs',
    },
    logoLayout: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: keyboardH ? '50@vs' : '72@vs',
      marginBottom: keyboardH ? '20@vs' : '32@vs',
    },
    formLayout: {
      padding: '16@ms',
      flex: 2,
    },
    inputStyle: {
      flex: 1,
      fontSize: '16@s',
      lineHeight: 22,
      letterSpacing: -0.6,
      borderBottomWidth: 1,
      // borderColor: color.StatusFail,
      borderColor: color.GrayscaleLine,
      padding: '3@ms0.3',
      color: '#000',
    },
    infoLayout: {
      flex: 1,
      fontSize: '12@ms0.3',
      textAlign: 'center',
      marginBottom: '50@ms',
    },
    checkboxRow: {
      flexDirection: 'row',
      marginBottom: keyboardH ? 8 : '42@vs',
      marginTop: keyboardH ? 10 : '12@vs',
    },
    inputRowStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    phoneInputStyle: {
      marginBottom: '22@vs',
    },
    buttonAreaLayout: {
      marginBottom: '50@vs',
    },
    emptyViewLayout: {
      height: '16@vs',
    },
    iconSize: { width: '24@ms', height: '24@ms' },
  });

  // if (userData === undefined) {
  //   return <Loader />;
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.logoLayout}>
            <Image style={styles.logo} source={require('~/Assets/Icons/logo.png')} />
          </View>
          <View style={styles.formLayout}>
            <View style={styles.phoneInputStyle}>
              {phone ? (
                <BasicText
                  text="전화번호"
                  color={color.PrimaryP900}
                  otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
                />
              ) : (
                <View style={styles.emptyViewLayout} />
              )}
              <View style={styles.inputRowStyle}>
                <TextInput
                  style={styles.inputStyle}
                  value={phone}
                  onChangeText={onChangePhone}
                  keyboardType={'number-pad'}
                  autoCorrect={false}
                  placeholder="전화번호"
                  placeholderTextColor={color.GrayscaleDisabledText}
                  ref={ref_input[0]}
                  onSubmitEditing={() => {
                    onFocusNext(0);
                    phoneValidation();
                  }}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  maxLength={13}
                />
                {phoneLengthChecked ? (
                  <InputIconCoord>
                    <CheckBlue style={styles.iconSize} />
                  </InputIconCoord>
                ) : phoneError ? (
                  <InputIconCoord>
                    <CheckRed style={styles.iconSize} />
                  </InputIconCoord>
                ) : null}
              </View>
              {!phoneLengthChecked && phoneError ? (
                <BasicText
                  color={color.StatusFail}
                  otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
                  text="010-000(0)-0000의 형태로 입력해주세요"
                />
              ) : (
                <View style={styles.emptyViewLayout} />
              )}
            </View>
            {password ? (
              <BasicText
                text="비밀번호"
                color={color.PrimaryP900}
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            ) : (
              <View style={styles.emptyViewLayout} />
            )}

            <View style={styles.inputRowStyle}>
              <TextInput
                style={styles.inputStyle}
                value={password}
                onChangeText={onChangePassword}
                ref={ref_input[1]}
                onSubmitEditing={() => {
                  onFocusNext(1);
                  passwordValidation();
                }}
                autoCorrect={false}
                placeholder="비밀번호"
                placeholderTextColor={color.GrayscaleDisabledText}
                autoCapitalize={'none'}
                secureTextEntry={isSecureText}
                returnKeyType={'done'}
                maxLength={16}
              />
              <InputIconCoord>
                <TouchableOpacity
                  style={{ width: 24, height: 24 }}
                  onPress={() => setIsSecureText((prev) => !prev)}>
                  {isSecureText ? (
                    <VisibilityOff style={styles.iconSize} />
                  ) : (
                    <VisibilityOn style={styles.iconSize} />
                  )}
                </TouchableOpacity>
              </InputIconCoord>
            </View>
            {passwordError ? (
              <BasicText
                otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
                color={color.StatusFail}
                text="비밀번호를 입력해주세요"
              />
            ) : (
              <View style={styles.emptyViewLayout} />
            )}
            <View style={styles.checkboxRow}>
              <SquareCheckbox
                isChecked={toggleCheckboxAutoLogin}
                onToggleCheckbox={onToggleCheckboxAutoLogin}
                text="자동로그인"
              />
              <View>
                <BasicText
                  otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
                  onPress={() => navigation.navigate('FindPassword')}
                  text="비밀번호 찾기"
                />
              </View>
            </View>
            <View style={styles.infoLayout}>
              <View style={styles.buttonAreaLayout}>
                {!phoneError || !passwordError ? (
                  <BasicButton onPress={onSubmit} title="로그인" />
                ) : (
                  <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
                )}
              </View>
              <View style={styles.inputRowStyle}>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
