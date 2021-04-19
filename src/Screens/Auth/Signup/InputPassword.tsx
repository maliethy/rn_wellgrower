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
  const { user_phone }: { user_phone: string | null } = route.params;
  const { data: userData, error, revalidate, mutate } = useSWR(`${back_url}/user`, fetcherGet, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  }); //dedupingInterval: 30분

  const [phone, onChangePhone, onResetPhone, setPhone] = useInput(user_phone);
  const [password, onChangePassword, onResetPassword, setPassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck, onResetPasswordCheck, setPasswordCheck] = useInput(
    '',
  );
  const [accountLock, setAccountLock] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const [loginError, setLoginError] = useState(false);
  const [userName, setUserName] = useState('김세경');

  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordCheck, setIsFocusedPasswordCheck] = useState(false);

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);

  const phoneLengthChecked =
    (phone.charAt(2) === '1' && 12 <= phone.length && phone.length < 14) ||
    (phone.charAt(2) === '0' && 12 <= phone.length && phone.length < 14);

  const passwordValidation = useCallback(() => {
    if (!password || !password.trim()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);
  const passwordCheckValidation = useCallback(() => {
    if (!passwordCheck || !passwordCheck.trim() || password !== passwordError) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  }, [passwordCheck]);
  useEffect(() => {
    autoHypenTel(phone, phone, setPhone);
  }, [phone]);

  const onSubmit = useCallback(async () => {
    try {
      // setAccountLock(true);
      // setLoginError(true);

      setPassword('');
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
      padding: '16@ms',
    },
    logo: {
      width: '72@s',
      height: '72@vs',
    },
    logoLayout: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '15%',
      paddingBottom: '5%',
    },
    formLayout: {
      flex: 1,
    },
    infoLayout: {
      fontSize: '12@ms0.3',
      textAlign: 'center',
      marginBottom: '50@ms',
    },
    checkboxRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '42@vs',
      marginTop: '12@vs',
    },
    inputRowStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: '38@vs',
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        keyboardVerticalOffset={-250}
        enabled>
        <ScrollView keyboardShouldPersistTaps="never">
          <View style={{ marginTop: 19, marginBottom: 24 }}>
            <BasicText
              bold={true}
              size={'20@ms0.3'}
              color={color.PrimaryP900}
              text={`${userName}님 안녕하세요`}
              otherStyle={{ lineHeight: 28, marginBottom: 4 }}
            />
            <BasicText
              size={'16@ms0.3'}
              color={color.GrayscaleSecondaryText}
              text={'잘키움은 휴대폰 번호를 아이디로 사용합니다'}
              otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
            />
          </View>
          <View style={styles.formLayout}>
            <View style={styles.inputRowStyle}>
              <FloatingLabelInput value={phone} label="전화번호" editable={false} />
            </View>
            <View style={styles.inputRowStyle}>
              <FloatingLabelInput
                isPassword
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
                showPasswordContainerStyles={{
                  width: ms(24),
                  height: ms(24),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: vs(25),
                  marginRight: 9,
                }}
                customShowPasswordComponent={<VisibilityOff style={styles.iconSize} />}
                customHidePasswordComponent={<VisibilityOn style={styles.iconSize} />}
              />
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
            <View style={styles.inputRowStyle}>
              <FloatingLabelInput
                isPassword
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
                showPasswordContainerStyles={{
                  width: ms(24),
                  height: ms(24),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: vs(25),
                  marginRight: 9,
                }}
                customShowPasswordComponent={<VisibilityOff style={styles.iconSize} />}
                customHidePasswordComponent={<VisibilityOn style={styles.iconSize} />}
              />
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
        </ScrollView>
        <View>
          {passwordError === false ||
          passwordCheckError === false ||
          !password ||
          !password.trim() ||
          !passwordCheck ||
          !passwordCheck.trim() ? (
            <PageButton disabled={true} title="동의하기" onPress={onSubmit} />
          ) : (
            <PageButton title="동의하기" onPress={onSubmit} />
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default InputPassword;
