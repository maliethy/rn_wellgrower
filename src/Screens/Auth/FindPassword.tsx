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
import BasicModal from '~/Components/BasicModal';
import HeaderCloseButton from '~/Components/HeaderCloseButton';

const FindPassword: FC<AuthProps> = ({ route, navigation }): ReactElement => {
  const { data: userData, error, revalidate, mutate } = useSWR(`${back_url}/user`, fetcherGet, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  }); //dedupingInterval: 30분

  const [phone, onChangePhone, onResetPhone, setPhone] = useInput('');
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
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const ref_input = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '비밀번호 재설정',
      headerRight: () => <HeaderCloseButton disabled />,
    });
  }, []);
  const passwordValidation = useCallback(() => {
    const passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (passwordRules.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password]);
  const passwordCheckValidation = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  }, [password, passwordCheck]);

  const onSubmit = useCallback(async () => {
    try {
      console.log(password, passwordCheck);
      setPasswordResetSuccess(true);
      setModalVisible(true);
      // setPassword('');
      // setPasswordCheck('');
    } catch (err) {
      console.dir(err);
    }
  }, [password, passwordCheck]);

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
    },
    subContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: '16@ms',
    },
    formLayout: {
      flex: 5,
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
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="never"
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.subContainer}>
            <View style={{ flex: 1, marginTop: 19, marginBottom: 24 }}>
              <BasicText
                bold={true}
                size={'20@ms'}
                color={color.PrimaryP900}
                text={`비밀번호를 재설정해주세요`}
                otherStyle={{ lineHeight: 28, marginBottom: 4 }}
              />
              <BasicText
                size={'16@ms'}
                color={color.GrayscaleSecondaryText}
                text={'비밀번호는 8자리 이상 16자리 이하의 영문, 숫자, 특수문자로 조합해주세요'}
                otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
              />
            </View>
            <View style={styles.formLayout}>
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
                      passwordValidation();
                    }}
                    isFocused={isFocusedPassword}
                    onSubmitEditing={() => {
                      passwordValidation();
                    }}
                    autoCorrect={false}
                    label="새비밀번호"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    maxLength={16}
                    secureTextEntry={isSecureTextPassword}
                  />
                  <InputIconCoord>
                    <TouchableOpacity
                      hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
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
                    text="올바르지 않은 형식입니다"
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
                      passwordCheckValidation();
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
                      hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
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
              <PageButton title="비밀번호 재설정" onPress={onSubmit} />
            ) : (
              <PageButton disabled={true} title="비밀번호 재설정" />
            )}
          </View>

          {passwordResetSuccess && (
            <BasicModal
              title="비밀번호 재설정 완료"
              text="비밀번호가 재설정 되었습니다"
              buttonText="로그인 하기"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default FindPassword;
