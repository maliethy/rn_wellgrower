import React, { FC, ReactElement, useState, useRef, useCallback, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
  Text,
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
import BasicText from '~/Components/BasicText';
import CheckBlue from '~/Assets/Icons/check_blue.svg';
import CheckRed from '~/Assets/Icons/close_red.svg';
import VisibilityOn from '~/Assets/Icons/visibility_on.svg';
import VisibilityOff from '~/Assets/Icons/visibility_off.svg';
import { InputIconCoord } from '~/styles';
import { color } from '~/styles';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import PageButton from '~/Components/PageButton';

const InputPassword: FC<AuthProps> = ({ route, navigation }): ReactElement => {
  const { user_phone } = route.params;
  const { data: userData, error, revalidate, mutate } = useSWR(`${back_url}/user`, fetcherGet, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  }); //dedupingInterval: 30분

  const [phone, onChangePhone, onResetPhone, setPhone] = useInput(user_phone);
  const [password, onChangePassword, onResetPassword, setPassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck, onResetPasswordCheck, setPasswordCheck] = useInput(
    '',
  );
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [userName, setUserName] = useState('김세경');
  const [isSecureTextPassword, setIsSecureTextPassword] = useState(true);
  const [isSecureTextPasswordCheck, setIsSecureTextPasswordCheck] = useState(true);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordCheck, setIsFocusedPasswordCheck] = useState(false);

  const ref_input = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const passwordValidation = useCallback(() => {
    const passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (passwordRules.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password]);
  const passwordCheckValidation = useCallback(() => {
    if (password !== passwordError) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  }, [password, passwordCheck]);
  useEffect(() => {
    passwordValidation();
  }, [password]);
  useEffect(() => {
    passwordCheckValidation();
  }, [passwordCheck]);
  useEffect(() => {
    autoHypenTel(phone, phone, setPhone);
  }, [phone]);

  const onSubmit = useCallback(async () => {
    try {
      // setAccountLock(true);
      // setLoginError(true);

      setPassword('');
      navigation.navigate('InputAddress');
    } catch (err) {
      console.dir(err);
    }
  }, [phone, password]);

  const [keyboardH, setKeyboardH] = useState(0);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [Keyboard]);
  const _keyboardDidShow = (e) => {
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
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    subContainer: {
      flex: 1,
      padding: '16@ms',
    },
    formLayout: {
      flex: 1,
    },
    infoLayout: {
      fontSize: '12@ms',
      textAlign: 'center',
      marginBottom: '50@ms',
    },
    checkboxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '42@vs',
      marginTop: '12@vs',
    },
    inputContainer: {
      marginBottom: '38@vs',
    },
    inputRowStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    emptyViewLayout: {
      height: '16@vs',
    },
    buttonAreaLayout: {
      flex: 1,

      justifyContent: 'flex-end',
    },
    iconSize: { width: '24@ms', height: '24@ms' },
  });

  // if (userData === undefined) {
  //   return <Loader />;
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        keyboardVerticalOffset={-90}
        enabled>
        <ScrollView keyboardShouldPersistTaps="never">
          <View style={styles.subContainer}>
            <View style={{ marginTop: 19, marginBottom: 24, flex: 2 }}>
              <BasicText
                bold={true}
                size={'20@ms'}
                color={color.PrimaryP900}
                text={`${userName}님 안녕하세요`}
                otherStyle={{ lineHeight: 28, marginBottom: 4 }}
              />
              <BasicText
                size={'16@ms'}
                color={color.GrayscaleSecondaryText}
                text={'잘키움은 휴대폰 번호를 아이디로 사용합니다'}
                otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
              />
            </View>
            <View style={styles.formLayout}>
              <View style={styles.inputContainer}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput value={phone} label="전화번호" editable={false} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput
                    value={password}
                    onChangeText={onChangePassword}
                    ref={ref_input[0]}
                    onFocus={() => {
                      setIsFocusedPassword(true);
                    }}
                    onBlur={() => {
                      setIsFocusedPassword(false);
                    }}
                    isFocused={isFocusedPassword}
                    onSubmitEditing={() => {
                      passwordValidation();
                    }}
                    autoCorrect={false}
                    label="비밀번호"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    maxLength={16}
                    secureTextEntry={isSecureTextPassword}
                  />
                  <InputIconCoord>
                    <TouchableOpacity
                      style={{ width: 30, height: 30 }}
                      onPress={() => setIsSecureTextPassword((prev) => !prev)}>
                      {isSecureTextPassword ? (
                        <VisibilityOff width={ms(27)} height={ms(27)} />
                      ) : (
                        <VisibilityOn width={ms(27)} height={ms(27)} />
                      )}
                    </TouchableOpacity>
                  </InputIconCoord>
                </View>
                {passwordError ? (
                  <BasicText
                    otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
                    color={color.StatusFail}
                    text="8자리 이상 16자리 이하, 영문+숫자+특수문자 조합"
                  />
                ) : (
                  <View style={styles.emptyViewLayout} />
                )}
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput
                    value={passwordCheck}
                    onChangeText={onChangePasswordCheck}
                    ref={ref_input[1]}
                    onFocus={() => {
                      setIsFocusedPasswordCheck(true);
                    }}
                    onBlur={() => {
                      setIsFocusedPasswordCheck(false);
                    }}
                    isFocused={isFocusedPasswordCheck}
                    onSubmitEditing={() => {
                      passwordCheckValidation();
                    }}
                    autoCorrect={false}
                    label="비밀번호 재입력"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    maxLength={16}
                    secureTextEntry={isSecureTextPasswordCheck}
                  />
                  <InputIconCoord>
                    <TouchableOpacity
                      style={{ width: 30, height: 30 }}
                      onPress={() => setIsSecureTextPasswordCheck((prev) => !prev)}>
                      {isSecureTextPasswordCheck ? (
                        <VisibilityOff width={ms(27)} height={ms(27)} />
                      ) : (
                        <VisibilityOn width={ms(27)} height={ms(27)} />
                      )}
                    </TouchableOpacity>
                  </InputIconCoord>
                </View>
                {passwordCheckError ? (
                  <BasicText
                    otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
                    color={color.StatusFail}
                    text="비밀번호가 동일하지 않습니다"
                  />
                ) : (
                  <View style={styles.emptyViewLayout} />
                )}
              </View>
            </View>
          </View>
          <View style={styles.buttonAreaLayout}>
            {passwordError === false ||
            passwordCheckError === false ||
            !password ||
            !password.trim() ||
            !passwordCheck ||
            !passwordCheck.trim() ? (
              <PageButton disabled={true} title="다음" onPress={onSubmit} />
            ) : (
              <PageButton title="다음" onPress={onSubmit} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default InputPassword;
