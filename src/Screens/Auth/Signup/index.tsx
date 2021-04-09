import * as React from 'react';
import { useCallback, useState, useEffect, FC } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import CheckBox from 'react-native-check-box';
import { AuthProps } from '~/@types/auth';

const Signup: FC<AuthProps> = ({ navigation }) => {
  const [toggleCheckBoxAll, setToggleCheckboxAll] = useState(true);
  const [toggleCheckBoxService, setToggleCheckboxService] = useState(true);
  const [toggleCheckBoxPrivateInfo, setToggleCheckboxPrivateInfo] = useState(true);
  const [toggleCheckBoxLocation, setToggleCheckboxLocation] = useState(true);
  const [toggleCheckBoxMarketing, setToggleCheckboxMarketing] = useState(true);

  useEffect(() => {
    if (
      toggleCheckBoxService === false ||
      toggleCheckBoxPrivateInfo === false ||
      toggleCheckBoxLocation === false ||
      toggleCheckBoxMarketing === false
    ) {
      setToggleCheckboxAll(false);
    } else {
      setToggleCheckboxAll(true);
    }
  }, [
    toggleCheckBoxService,
    toggleCheckBoxPrivateInfo,
    toggleCheckBoxLocation,
    toggleCheckBoxMarketing,
  ]);
  const onToggleCheckboxAll = useCallback(
    (prev) => {
      setToggleCheckboxAll(prev);
      setToggleCheckboxService(prev);
      setToggleCheckboxPrivateInfo(prev);
      setToggleCheckboxLocation(prev);
      setToggleCheckboxMarketing(prev);
    },
    [toggleCheckBoxAll],
  );
  const onToggleCheckboxService = useCallback(
    (prev) => {
      setToggleCheckboxService(prev);
    },
    [toggleCheckBoxService],
  );
  const onToggleCheckboxPrivateInfo = useCallback(
    (prev) => {
      setToggleCheckboxPrivateInfo(prev);
    },
    [toggleCheckBoxPrivateInfo],
  );
  const onToggleCheckboxLocation = useCallback(
    (prev) => {
      setToggleCheckboxLocation(prev);
    },
    [toggleCheckBoxLocation],
  );
  const onToggleCheckboxMarketing = useCallback(
    (prev) => {
      setToggleCheckboxMarketing(prev);
    },
    [toggleCheckBoxMarketing],
  );
  const onSubmit = useCallback(async () => {
    try {
      console.log(
        toggleCheckBoxService,
        toggleCheckBoxPrivateInfo,
        toggleCheckBoxLocation,
        toggleCheckBoxMarketing,
      );

      navigation.navigate('Certification');
    } catch (err) {
      console.dir(err);
    }
  }, [
    toggleCheckBoxService,
    toggleCheckBoxPrivateInfo,
    toggleCheckBoxLocation,
    toggleCheckBoxMarketing,
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>약관동의</Text>
          <Text>소중한 나의 작물이 잘 자랄 수 있게{'\n'}잘키움으로 관리해보세요</Text>
        </View>
        <View style={styles.checkboxLayout}>
          <View style={styles.checkboxAllStyle}>
            <CheckBox
              style={styles.checkboxStyle}
              tintColors={{ false: 'grey', true: 'orange' }}
              boxType="square"
              disabled={false}
              value={toggleCheckBoxAll}
              onValueChange={onToggleCheckboxAll}
            />
            <Text style={{ fontSize: 20 }}>약관 전체동의</Text>
          </View>
          <View style={[styles.checkboxRowStyle, { justifyContent: 'space-between' }]}>
            <View style={styles.textRowStyle}>
              <CheckBox
                style={styles.checkboxStyle}
                tintColors={{ false: 'grey', true: 'orange' }}
                boxType="square"
                disabled={false}
                value={toggleCheckBoxService}
                onValueChange={onToggleCheckboxService}
              />

              <Text>서비스 이용약관 동의(필수)</Text>
            </View>
            <Text onPress={() => navigation.navigate('UserAgreement')}>보기</Text>
          </View>
          <View style={[styles.checkboxRowStyle, { justifyContent: 'space-between' }]}>
            <View style={styles.textRowStyle}>
              <CheckBox
                style={styles.checkboxStyle}
                tintColors={{ false: 'grey', true: 'orange' }}
                boxType="square"
                disabled={false}
                value={toggleCheckBoxPrivateInfo}
                onValueChange={onToggleCheckboxPrivateInfo}
              />
              <Text>개인정보 제공 동의(필수)</Text>
            </View>
            <Text onPress={() => navigation.navigate('PersonalInfoPolicy')}>보기</Text>
          </View>
          <View style={styles.checkboxRowStyle}>
            <CheckBox
              style={styles.checkboxStyle}
              tintColors={{ false: 'grey', true: 'orange' }}
              boxType="square"
              disabled={false}
              value={toggleCheckBoxLocation}
              onValueChange={onToggleCheckboxLocation}
            />
            <Text>위치정보 제공 동의(선택)</Text>
          </View>
          <View style={styles.checkboxRowStyle}>
            <CheckBox
              style={styles.checkboxStyle}
              tintColors={{ false: 'grey', true: 'orange' }}
              boxType="square"
              disabled={false}
              value={toggleCheckBoxMarketing}
              onValueChange={onToggleCheckboxMarketing}
            />
            <Text>마케팅수신 동의(선택)</Text>
          </View>
        </View>
        <View style={styles.infoLayout}>
          {toggleCheckBoxService === false || toggleCheckBoxPrivateInfo === false ? (
            <View style={styles.buttonAreaLayout}>
              <Text>값을 모두 넣어주세요</Text>
              <Button onPress={onSubmit} title="동의하고 시작하기" disabled={true} />
            </View>
          ) : (
            <View style={styles.buttonAreaLayout}>
              <Button onPress={onSubmit} title="동의하고 시작하기" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 26,
  },
  title: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  checkboxLayout: {
    flex: 5,
  },
  checkboxAllStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  checkboxRowStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 30,
  },
  textRowStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxStyle: { borderColor: '#000', transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  infoLayout: {
    flex: 1,
  },
  buttonAreaLayout: {
    fontSize: 20,
    marginTop: 36,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
export default Signup;
