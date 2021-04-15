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

import axios from 'axios';
import useSWR from 'swr';
import fetcher from '~/utils/fetcher';
import produce from 'immer';
import useInput from '~/Utils/useInput';
import GoToButton from '~/Components/GoToButton';
import { CloseButtonCoord } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { SettingProps } from '~/@types/setting';

// const back_url = "http://192.168.0.20:3000/api";
const ChangePassword: FC<SettingProps> = ({ route, navigation }): ReactElement => {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );:
  const title = route.params.title;

  const ref_input: Array<React.RefObject<TextInput>> = [];
  ref_input[0] = useRef(null);
  ref_input[1] = useRef(null);
  ref_input[2] = useRef(null);

  const onFocusNext = (index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus();
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur();
    }
  };

  const [
    beforePassword,
    onChangeBeforePassword,
    onResetBeforePassword,
    setBeforePassword,
  ] = useInput('');
  const [afterPassword, onChangeAfterPassword, onResetAfterPassword, setAfterPassword] = useInput(
    '',
  );
  const [passwordCheck, onChangePasswordCheck, onResetPasswordCheck, setPasswordCheck] = useInput(
    '',
  );
  const [isSecureText, setIsSecureText] = useState(false);
  const [misMatchError, setMisMatchError] = useState(false);
  const [notAllowPassword, setNotAllowPassword] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      // const emailRegex = /^(([^<>()\[\]\\.,;:\s~"]+(\.[^<>()\[\]\\.,;:\s~"]+)*)|(".+"))~((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // if (!email || !email.trim()! || !emailRegex.test(email)!) {
      //   return setErrorEmail('유효하지 않은 이메일입니다.');
      // }

      if (beforePassword !== '1234') {
        return setNotAllowPassword(true);
      }

      Alert.alert('비밀번호 재설정이 완료되었습니다.');
      navigation.navigate('PrivateInfo');

      setBeforePassword('');
      setAfterPassword('');
      setPasswordCheck('');
      setMisMatchError(false);

      setNotAllowPassword(false);
    } catch (err) {
      console.dir(err);
    }
  }, [beforePassword, afterPassword, passwordCheck]);
  useEffect(() => {
    if (afterPassword !== passwordCheck) {
      setMisMatchError(true);
    } else {
      setMisMatchError(false);
    }
  }, [afterPassword, passwordCheck]);
  // if (userData === undefined) {
  //   return <Loader />;
  // }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.titleLayout}>
          <Text style={{ marginBottom: 36 }}>{title}</Text>
          <View style={styles.formLayout}>
            <View style={styles.rowstyle}>
              <TextInput
                style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
                value={beforePassword}
                onChangeText={onChangeBeforePassword}
                ref={ref_input[0]}
                onSubmitEditing={() => onFocusNext(0)}
                autoCorrect={false}
                // errorMessage={errorPassword}
                // rightIcon={{
                //   type: 'antdesign',
                //   name: isSecureText ? 'eye' : 'eyeo',
                //   onPress: () => setIsSecureText((prev) => !prev),
                // }}
                placeholder="현재 비밀번호 입력"
                autoCapitalize={'none'}
                secureTextEntry={isSecureText}
              />
              <CloseButtonCoord>
                {beforePassword && (
                  <AntDesign
                    name="closecircle"
                    color="grey"
                    size={'16@ms0.3'}
                    onPress={onResetBeforePassword}
                  />
                )}
              </CloseButtonCoord>
            </View>
            <View>
              {notAllowPassword && (
                <Text style={styles.errorMessage}>현재 비밀번호가 일치하지 않습니다.</Text>
              )}
            </View>
            <View style={styles.rowstyle}>
              <TextInput
                style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
                value={afterPassword}
                onChangeText={onChangeAfterPassword}
                ref={ref_input[1]}
                onSubmitEditing={() => onFocusNext(1)}
                autoCorrect={false}
                // errorMessage={errorPassword}
                // rightIcon={{
                //   type: 'antdesign',
                //   name: isSecureText ? 'eye' : 'eyeo',
                //   onPress: () => setIsSecureText((prev) => !prev),
                // }}
                placeholder="새 비밀번호 입력"
                autoCapitalize={'none'}
                secureTextEntry={isSecureText}
              />
              <CloseButtonCoord>
                {afterPassword && (
                  <AntDesign
                    name="closecircle"
                    color="grey"
                    size={'16@ms0.3'}
                    onPress={onResetAfterPassword}
                  />
                )}
              </CloseButtonCoord>
            </View>
            <View style={styles.rowstyle}>
              <TextInput
                style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
                value={passwordCheck}
                onChangeText={onChangePasswordCheck}
                ref={ref_input[2]}
                onSubmitEditing={() => onFocusNext(2)}
                autoCorrect={false}
                // errorMessage={errorPassword}
                // rightIcon={{
                //   type: 'antdesign',
                //   name: isSecureText ? 'eye' : 'eyeo',
                //   onPress: () => setIsSecureText((prev) => !prev),
                // }}
                placeholder="새 비밀번호 확인"
                autoCapitalize={'none'}
                secureTextEntry={isSecureText}
              />
              <CloseButtonCoord>
                {passwordCheck && (
                  <AntDesign
                    name="closecircle"
                    color="grey"
                    size={'16@ms0.3'}
                    onPress={onResetPasswordCheck}
                  />
                )}
              </CloseButtonCoord>
            </View>
            <View>
              {misMatchError && (
                <Text style={styles.errorMessage}>비밀번호가 일치하지 않습니다.</Text>
              )}
            </View>
            {!beforePassword || !afterPassword || !passwordCheck ? (
              <View style={styles.buttonAreaLayout}>
                <Text>값을 모두 넣어주세요</Text>
              </View>
            ) : (
              <View style={styles.buttonAreaLayout}>
                <Button onPress={onSubmit} title="비밀번호 재설정" />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titleLayout: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
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
  errorMessage: {
    color: 'red',
    textAlign: 'center',
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

export default ChangePassword;
