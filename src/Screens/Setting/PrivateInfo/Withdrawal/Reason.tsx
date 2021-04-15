import * as React from 'react';
import { useState, useEffect, useCallback, useRef, FC, MutableRefObject } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from 'react-native-check-box';
import useInput from '~/Utils/useInput';
import { CloseButtonCoord } from '../styles';
import { SettingProps } from '~/@types/setting';
import Toast from 'react-native-fast-toast';

const Withdrawal: FC<SettingProps> = ({ navigation }) => {
  const [detailReason, onChangeDetailReason, onResetDetailReason, setDetailReason] = useInput('');
  const [withdrawalAlert, setWithdrawalAlert] = useState(false);
  const [toggleCheckBoxNotUse, setToggleCheckboxNotUse] = useState(false);
  const [toggleCheckBoxUnSafe, setToggleCheckboxUnSafe] = useState(false);
  const [toggleCheckBoxDifficult, setToggleCheckboxDifficult] = useState(false);
  const [toggleCheckBoxETC, setToggleCheckboxETC] = useState(false);
  const ref_input = useRef<TextInput>(null);
  const toastRef = useRef<Toast>(null);

  const onToggleCheckboxNotUse = useCallback(
    (prev) => {
      setToggleCheckboxNotUse(prev);
    },
    [toggleCheckBoxNotUse],
  );
  const onToggleCheckboxUnSafe = useCallback(
    (prev) => {
      setToggleCheckboxUnSafe(prev);
    },
    [toggleCheckBoxUnSafe],
  );
  const onToggleCheckboxDifficult = useCallback(
    (prev) => {
      setToggleCheckboxDifficult(prev);
    },
    [toggleCheckBoxDifficult],
  );
  const onToggleCheckboxETC = useCallback(
    (prev) => {
      setToggleCheckboxETC(prev);
    },
    [toggleCheckBoxETC],
  );
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.closeButton}>
        <AntDesign
          name="close"
          color="grey"
          size={36}
          onPress={() => navigation.navigate('WithdrawalGrace')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>왜 떠나는지 말씀해 주세요</Text>
        <Text>해당 내용을 바탕으로{'\n'}더 나은 서비스를 만들겠습니다 </Text>
      </View>
      <View style={styles.checkboxLayout}>
        <View style={[styles.checkboxRowStyle, { marginTop: 15 }]}>
          <CheckBox
            style={styles.checkboxStyle}
            tintColors={{ false: 'grey', true: 'orange' }}
            boxType="square"
            disabled={false}
            value={toggleCheckBoxNotUse}
            onValueChange={onToggleCheckboxNotUse}
          />
          <Text>더 이상 사용하지 않습니다.</Text>
        </View>
        <View style={styles.checkboxRowStyle}>
          <CheckBox
            style={styles.checkboxStyle}
            tintColors={{ false: 'grey', true: 'orange' }}
            boxType="square"
            disabled={false}
            value={toggleCheckBoxUnSafe}
            onValueChange={onToggleCheckboxUnSafe}
          />
          <Text>안전에 관한 우려가 있습니다.</Text>
        </View>
        <View style={styles.checkboxRowStyle}>
          <CheckBox
            style={styles.checkboxStyle}
            tintColors={{ false: 'grey', true: 'orange' }}
            boxType="square"
            disabled={false}
            value={toggleCheckBoxDifficult}
            onValueChange={onToggleCheckboxDifficult}
          />
          <Text>이용방법이 어렵습니다.</Text>
        </View>
        <View style={styles.checkboxRowStyle}>
          <CheckBox
            style={styles.checkboxStyle}
            tintColors={{ false: 'grey', true: 'orange' }}
            boxType="square"
            disabled={false}
            value={toggleCheckBoxETC}
            onValueChange={onToggleCheckboxETC}
          />
          <Text>기타</Text>
        </View>
        <View style={styles.detailReason}>
          <Text>더 자세히 말해주기</Text>
          <TextInput
            style={styles.textInputStyle}
            value={detailReason}
            onChangeText={onChangeDetailReason}
            ref={ref_input}
            autoCorrect={false}
            autoCapitalize={'none'}
          />
          <CloseButtonCoord reason>
            {detailReason && (
              <AntDesign
                name="closecircle"
                color="grey"
                size={'16@ms0.3'}
                onPress={onResetDetailReason}
              />
            )}
          </CloseButtonCoord>
        </View>
        <View style={styles.textContainer}>
          <Text>앞으로 벌어질 일</Text>
          <Text>회원님의 프로필과 등록된 농지/영농일지가 사라집니다 </Text>
          <Text>회원님이 보고싶을 거에요 </Text>
        </View>
        <View>
          <Button
            title="제출하기"
            onPress={() => {
              toastRef.current?.show('소중한 의견 감사합니다');
              navigation.navigate('WithdrawalGrace');
            }}
          />
        </View>
      </View>
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
};
export default Withdrawal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 5,
  },
  textInputStyle: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 0,
  },
  checkboxLayout: {
    borderColor: '#000',
    borderWidth: 1,
    width: '90%',
    height: '70%',
  },
  checkboxRowStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
  },
  checkboxStyle: { borderColor: '#000', transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  detailReason: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 50,
    marginBottom: 16,
  },
});
