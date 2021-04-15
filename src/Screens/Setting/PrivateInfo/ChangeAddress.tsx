import React, { FC, ReactElement, useState, useRef, useCallback, useEffect } from 'react';
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
import { CloseButtonCoord, CloseButtonCoordForTextArea } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '~/Components/Loader';
import { SettingProps, Route } from '~/@types/setting';

// const back_url = "http://192.168.0.20:3000/api";
const ChangeAddress: FC<SettingProps> = ({ route, navigation }): ReactElement => {
  // const { data: userData, mutate: mutateUser, error } = useSWR(
  //   `${back_url}/users`,
  //   fetcher
  // );:
  const { postcode, addr, extraAddr, title } = route.params || '';
  const [addrValue, setAddrValue] = useState('');
  const [detailedAddr, onChangeDetailedAddr, onResetDetailedAddr, setDetailedAddr] = useInput('');
  const ref_input = useRef<TextInput>(null);
  useEffect(() => {
    if (postcode) {
      ref_input.current?.focus();
    }
  }, [postcode]);
  const onSubmit = useCallback(async () => {
    try {
      console.log(postcode, addr, extraAddr, detailedAddr);

      Alert.alert('문의가 접수되었습니다.');
      navigation.goBack();
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.titleLayout}>
          <Text style={{ marginBottom: 36 }}>{title}</Text>
          <View>
            <View style={styles.rowstyle}>
              <View
                style={[
                  styles.inputLayout,
                  {
                    flex: 1,
                    width: '100%',
                    height: '100%',
                  },
                ]}>
                <TextInput
                  placeholder="우편번호"
                  value={postcode}
                  autoCorrect={false}
                  editable={false}
                />
              </View>
              <Button onPress={() => navigation.navigate('PostcodeModal')} title="찾기" />
            </View>
            <View style={styles.inputLayout}>
              <TextInput
                placeholder="주소"
                value={addrValue}
                autoCorrect={false}
                editable={false}
              />
            </View>
            <View style={styles.inputLayout}>
              <TextInput
                value={detailedAddr}
                onChangeText={onChangeDetailedAddr}
                ref={ref_input}
                placeholder="상세주소를 입력해주세요"
              />
            </View>
            <CloseButtonCoord>
              {detailedAddr && (
                <AntDesign
                  name="closecircle"
                  color="grey"
                  size={'16@ms0.3'}
                  onPress={onResetDetailedAddr}
                />
              )}
            </CloseButtonCoord>
            <View style={styles.infoLayout}>
              {!postcode || !addr || !detailedAddr ? (
                <View style={styles.buttonAreaLayout}>
                  <Text>값을 모두 넣어주세요</Text>
                  <Button onPress={onSubmit} title="수정완료" disabled={true} />
                </View>
              ) : (
                <View style={styles.buttonAreaLayout}>
                  <Button onPress={onSubmit} title="수정완료" />
                </View>
              )}
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
  },

  inputLayout: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
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
    flexDirection: 'row',
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
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  infoLayout: {
    flex: 1,
    width: '100%',
    height: '100%',
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

export default ChangeAddress;
