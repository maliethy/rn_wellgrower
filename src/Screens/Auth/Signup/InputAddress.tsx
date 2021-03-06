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
import SmallButton from '~/Components/SmallButton';
import PageButton from '~/Components/PageButton';
import BasicText from '~/Components/BasicText';
import { color } from '~/styles';
import Loader from '~/Components/Loader';
import { AuthProps } from '~/@types/auth';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { s, vs, ms, mvs } from 'react-native-size-matters';
import useOrientation from '~/Utils/useOrientation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const back_url = "http://192.168.0.20:3000/api";
const InputAddress = ({ route, navigation }) => {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );:
  const { postcode, addr, extraAddr, title } = route.params || '';
  const [addrValue, setAddrValue] = useState('');
  const [detailedAddr, onChangeDetailedAddr, onResetDetailedAddr, setDetailedAddr] = useInput('');
  const [isFocusedDetailAddr, setIsFocusedDetailAddr] = useState(false);
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

  useEffect(() => {
    if (postcode) {
      ref_input.current?.focus();
    }
  }, [postcode]);
  const onSubmit = useCallback(async () => {
    try {
      console.log('???????????? ????????????', postcode, addr, extraAddr, detailedAddr);

      navigation.navigate('Welcome');
    } catch (err) {
      console.dir(err);
    }
  }, [postcode, addr, extraAddr]);
  useEffect(() => {
    addr && extraAddr
      ? setAddrValue(`${addr}(${extraAddr})`)
      : addr
      ? setAddrValue(addr)
      : setAddrValue('');
  }, [addr]);

  // if (userData === undefined) {
  //   return <Loader />;
  // }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={-190}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="never"
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.subContainer}>
            <View style={{ flex: 0.5 }}>
              <BasicText
                bold={true}
                size={'20@ms'}
                color={color.PrimaryP900}
                text={'???????????? ??????'}
                otherStyle={{ lineHeight: 28, marginBottom: 4 }}
              />
              <BasicText
                size={'16@ms'}
                color={color.GrayscaleSecondaryText}
                text={'?????? ????????? ??????????????????'}
                otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
              />
            </View>
            <View style={styles.formLayout}>
              <View style={styles.InputContainerStyle}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{ flex: 2 }}>
                    <FloatingLabelInput
                      value={postcode}
                      label="????????????"
                      disableFullscreenUI={true}
                      editable={false}
                    />
                  </View>
                  <View>
                    <SmallButton
                      onPress={() =>
                        navigation.navigate('PostcodeModal', { comeFrom: 'InputAddress' })
                      }
                      title="??????"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.InputContainerStyle}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput
                    value={addrValue}
                    autoCorrect={false}
                    editable={false}
                    label="??????"
                  />
                </View>
              </View>
              <View style={styles.InputContainerStyle}>
                <View style={styles.inputRowStyle}>
                  <FloatingLabelInput
                    value={detailedAddr}
                    onChangeText={onChangeDetailedAddr}
                    label="???????????? ??????"
                    disableFullscreenUI={true}
                    ref={ref_input[2]}
                    isFocused={isFocusedDetailAddr}
                    onFocus={() => {
                      setIsFocusedDetailAddr(true);
                    }}
                    onBlur={() => {
                      setIsFocusedDetailAddr(false);
                    }}
                    onSubmitEditing={() => {
                      setIsFocusedDetailAddr(false);
                      onFocusNext(0);
                    }}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    returnKeyType={'next'}
                    maxLength={250}
                    multiline={true}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            {!postcode || !addr || !detailedAddr ? (
              <PageButton title="??????" disabled={true} />
            ) : (
              <PageButton onPress={onSubmit} title="??????" />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
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
    flex: 10,
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
  inputContainer: {
    marginBottom: '38@vs',
  },
  InputContainerStyle: {
    marginBottom: '22@vs',
  },
  buttonAreaLayout: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  emptyViewLayout: {
    height: '16@vs',
  },
});

export default InputAddress;
