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
  Text,
  Image,
  InteractionManager,
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
import { color } from '~/styles';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import SquareCheckbox from '~/Components/SquareCheckbox';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import useOrientation from '~/Utils/useOrientation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LogIn: FC<AuthProps> = ({ navigation }): ReactElement => {
  const { data: userData, error, revalidate, mutate } = useSWR(`${back_url}/user`, fetcherGet, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  }); //dedupingInterval: 30분

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
  const [toggleCheckboxAutoLogin, setToggleCheckboxAutoLogin] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);
  const orientation = useOrientation();
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

  useEffect(() => {
    if (password) {
      passwordValidation();
    }
  }, [password]);

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

      if (accessToken) {
        axios
          .post(`${back_url}/v1/auth/login`, {
            user_phone: phone,
            user_pswd: password,
          })
          .then((res) => {
            console.log(res);
            revalidate();
          })
          .catch((err) => {
            setLoginError(err.response?.data?.statusCode === 422);
          });
      } else {
        axios
          .post(`${back_url}/v1/token/access`, {
            user_phone: phone,
            user_pswd: password,
            header: { authorization: refreshToken },
          })
          .then((res) => {
            console.log(res);
            revalidate();
          })
          .catch((err) => {
            console.log(err);
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
      padding: '16@ms',
    },
    logo: {
      width: '90@ms',
      height: '90@ms',
    },
    logoLayout: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '15%',
      paddingBottom: '5%',
    },
    formLayout: {
      flex: 2,
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
    inputRowStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    phoneInputStyle: {
      marginBottom: '22@vs',
    },
    buttonAreaLayout: {
      marginBottom: keyboardH ? 0 : '50@vs',
    },
    emptyViewLayout: {
      height: '16@vs',
    },
  });

  // if (userData === undefined) {
  //   return <Loader />;
  // }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {orientation === 'PORTRAIT' ? (
        <KeyboardAvoidingView
          behavior="position"
          style={styles.container}
          keyboardVerticalOffset={-250}
          enabled>
          <ScrollView keyboardShouldPersistTaps="never">
            <View style={styles.logoLayout}>
              <Image style={styles.logo} source={require('~/Assets/Icons/logo.png')} />
            </View>
            <View style={styles.formLayout}>
              <View style={styles.phoneInputStyle}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput
                    value={phone}
                    onChangeText={onChangePhone}
                    keyboardType={'number-pad'}
                    autoCorrect={false}
                    label="전화번호"
                    ref={ref_input[0]}
                    isFocused={isFocusedPhone}
                    onFocus={() => {
                      setIsFocusedPhone(true);
                    }}
                    onBlur={() => {
                      setIsFocusedPhone(false);
                      phoneValidation();
                    }}
                    onSubmitEditing={() => {
                      setIsFocusedPhone(false);
                      onFocusNext(0);
                    }}
                    autoCapitalize={'none'}
                    returnKeyType={'next'}
                    maxLength={13}
                    rightComponent={
                      phoneLengthChecked ? (
                        <InputIconCoord>
                          <CheckBlue width={ms(27)} height={ms(27)} />
                        </InputIconCoord>
                      ) : phoneError ? (
                        <InputIconCoord>
                          <CheckRed width={ms(27)} height={ms(27)} />
                        </InputIconCoord>
                      ) : null
                    }
                  />
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
              <View style={styles.inputRowStyle}>
                <FloatingLabelInput
                  inputStyles={{
                    color: '#000',
                    textAlignVertical: 'center',
                    fontSize: ms(18),
                    paddingTop: vs(24),
                    paddingBottom: 0,
                    minHeight: 0,
                    lineHeight: 15,
                    letterSpacing: -0.6,
                    fontFamily: 'NotoSansKR-Regular',
                    position: 'relative',
                    top: -4,
                  }}
                  value={password}
                  onChangeText={onChangePassword}
                  ref={ref_input[1]}
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
                  disableFullscreenUI={true}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  maxLength={16}
                  secureTextEntry={isSecureText}
                />
                <InputIconCoord>
                  <TouchableOpacity
                    style={{ width: 30, height: 30 }}
                    onPress={() => setIsSecureText((prev) => !prev)}>
                    {isSecureText ? (
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
                    color={color.GrayscaleSecondaryText}
                    otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
                    onPress={() => navigation.navigate('FindPassword')}
                    text="비밀번호 찾기"
                  />
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
          <View style={styles.infoLayout}>
            <View style={styles.buttonAreaLayout}>
              {phone &&
              phone.trim() &&
              password &&
              password.trim() &&
              !phoneError &&
              !passwordError ? (
                <BasicButton onPress={onSubmit} title="로그인" />
              ) : (
                <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
              )}
            </View>

            {keyboardH ? null : (
              <View style={styles.inputRowStyle}>
                <View style={{ marginRight: 3 }}>
                  <BasicText color={color.GrayscaleSecondaryText} text="아직 계정이 없어요" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <BasicText bold={true} text="회원가입하기" color={color.PrimaryLight} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={5}
          resetScrollToCoords={{ x: 0, y: 100 }}
          scrollEnabled={true}
          style={styles.container}>
          <View style={styles.logoLayout}>
            <Image style={styles.logo} source={require('~/Assets/Icons/logo.png')} />
          </View>
          <View style={styles.formLayout}>
            <View style={styles.phoneInputStyle}>
              <View style={styles.inputRowStyle}>
                <FloatingLabelInput
                  value={phone}
                  onChangeText={onChangePhone}
                  keyboardType={'number-pad'}
                  autoCorrect={false}
                  label="전화번호"
                  disableFullscreenUI={true}
                  ref={ref_input[0]}
                  isFocused={isFocusedPhone}
                  onFocus={() => {
                    setIsFocusedPhone(true);
                  }}
                  onBlur={() => {
                    setIsFocusedPhone(false);
                  }}
                  onSubmitEditing={() => {
                    setIsFocusedPhone(false);
                    onFocusNext(0);
                    phoneValidation();
                  }}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  maxLength={13}
                  rightComponent={
                    phoneLengthChecked ? (
                      <InputIconCoord>
                        <CheckBlue width={ms(27)} height={ms(27)} />
                      </InputIconCoord>
                    ) : phoneError ? (
                      <InputIconCoord>
                        <CheckRed width={ms(27)} height={ms(27)} />
                      </InputIconCoord>
                    ) : null
                  }
                />
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
            <View style={styles.inputRowStyle}>
              <FloatingLabelInput
                isPassword
                value={password}
                onChangeText={onChangePassword}
                ref={ref_input[1]}
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
                disableFullscreenUI={true}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                maxLength={16}
                secureTextEntry={isSecureText}
                // showPasswordContainerStyles={{
                //   width: ms(24),
                //   height: ms(24),
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   marginTop: vs(25),
                //   marginRight: 9,
                // }}
                // customShowPasswordComponent={<VisibilityOff width={ms(27)} height={ms(27)} />}
                // customHidePasswordComponent={<VisibilityOn width={ms(27)} height={ms(27)} />}
              />
            </View>
            <InputIconCoord>
              <TouchableOpacity
                style={{ width: 24, height: 24 }}
                onPress={() => setIsSecureText((prev) => !prev)}>
                {isSecureText ? (
                  <VisibilityOff width={ms(27)} height={ms(27)} />
                ) : (
                  <VisibilityOn width={ms(27)} height={ms(27)} />
                )}
              </TouchableOpacity>
            </InputIconCoord>
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
                  otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
                  onPress={() => navigation.navigate('FindPassword')}
                  text="비밀번호 찾기"
                />
              </View>
            </View>
          </View>
          <View style={styles.infoLayout}>
            <View style={styles.buttonAreaLayout}>
              {phone &&
              phone.trim() &&
              password &&
              password.trim() &&
              !phoneError &&
              !passwordError ? (
                <BasicButton onPress={onSubmit} title="로그인" />
              ) : (
                <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
              )}
            </View>

            {keyboardH ? null : (
              <View style={styles.inputRowStyle}>
                <View style={{ marginRight: 3 }}>
                  <BasicText text="아직 계정이 없어요" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <BasicText bold={true} text="회원가입하기" color={color.PrimaryLight} />
                </TouchableOpacity>
              </View>
            )}
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
        </KeyboardAwareScrollView>
      )}
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
