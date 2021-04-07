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
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '~/utils/fetcher';
import produce from 'immer';
import useInput from '~/Utils/useInput';
import BasicButton from '~/Components/BasicButton';
import BasicText from '~/Components/BasicText';
import { CloseButtonCoord } from './styles';
import color from '~/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';

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
  const [toggleCheckBox, setToggleCheckbox] = useState(true);

  useEffect(() => {
    if (phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phone.length === 13) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phone]);

  const onToggleCheckbox = useCallback(
    (prev) => {
      setToggleCheckbox(prev);
    },
    [toggleCheckBox],
  );

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
            <View style={styles.rowstyle}>
              <TextInput
                style={{ flex: 0.7, borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
                value={phone}
                onChangeText={onChangePhone}
                keyboardType={'numeric'}
                autoCorrect={false}
                placeholder="전화번호"
                ref={ref_input[0]}
                onSubmitEditing={() => onFocusNext(0)}
                // errorMessage={errorPhone}
                clearTextOnFocus={true}
                autoCapitalize={'none'}
              />
              <CloseButtonCoord>
                {phone && (
                  <AntDesign name="closecircle" color="grey" size={16} onPress={onResetPhone} />
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
                  <AntDesign
                    name="closecircle"
                    color="#005500"
                    size={16}
                    onPress={onResetPassword}
                  />
                )}
              </CloseButtonCoord>
            </View>
            <View style={styles.checkboxRowStyle}>
              <CheckBox
                style={styles.checkboxStyle}
                tintColors={{ false: '#fff', true: `${color.primary}` }}
                tintColor={color.primary}
                onTintColor={color.primary}
                onFillColor={color.primary}
                onCheckColor="#fff"
                boxType="square"
                disabled={false}
                value={toggleCheckBox}
                onValueChange={onToggleCheckbox}
              />
              <Text>자동 로그인</Text>
            </View>
            {/* <View>
              {misMatchError && (
                <Text style={styles.buttonText}>이메일 또는 비밀번호가 일치하지 않습니다.</Text>
              )}
            </View> */}
            <View style={styles.infoLayout}>
              <View style={styles.buttonAreaLayout}>
                <BasicButton onPress={onSubmit} title="로그인" />
                <BasicButton disabled={true} onPress={onSubmit} title="로그인" />
              </View>
              <View style={styles.rowstyle}>
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
    flex: 2,
    justifyContent: 'center',
  },
  // inputLayout: {
  //   flex: 2,
  // },
  infoLayout: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
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
  checkboxStyle: { borderColor: '#000', transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
});

export default LogIn;
