import * as React from 'react';
import { useCallback, useState, useEffect, FC } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { AuthProps } from '~/@types/auth';
import CircleCheckbox from '~/Components/CircleCheckbox';
import NoBorderCheckbox from '~/Components/NoBorderCheckbox';
import PageButton from '~/Components/PageButton';
import BasicText from '~/Components/BasicText';
import color from '~/styles';
import { ScaledSheet } from 'react-native-size-matters';

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
  useEffect(() => {
    if (toggleCheckBoxAll === true) {
      setToggleCheckboxService(true);
      setToggleCheckboxPrivateInfo(true);
      setToggleCheckboxLocation(true);
      setToggleCheckboxMarketing(true);
    }
  }, [toggleCheckBoxAll]);
  const onToggleCheckboxAll = useCallback(() => {
    setToggleCheckboxAll((prev) => !prev);
  }, []);
  const onToggleCheckboxService = useCallback(() => {
    setToggleCheckboxService((prev) => !prev);
  }, []);
  const onToggleCheckboxPrivateInfo = useCallback(() => {
    setToggleCheckboxPrivateInfo((prev) => !prev);
  }, []);
  const onToggleCheckboxLocation = useCallback(() => {
    setToggleCheckboxLocation((prev) => !prev);
  }, []);
  const onToggleCheckboxMarketing = useCallback(() => {
    setToggleCheckboxMarketing((prev) => !prev);
  }, []);
  const onSubmit = useCallback(async () => {
    try {
      console.log(
        toggleCheckBoxService,
        toggleCheckBoxPrivateInfo,
        toggleCheckBoxLocation,
        toggleCheckBoxMarketing,
      );
      navigation.navigate('CertificationTest');
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
      <View style={styles.subContainer}>
        <View style={styles.titleLayout}>
          <BasicText
            bold={true}
            size={'20@ms0.3'}
            color={color.PrimaryP900}
            text="약관동의"
            otherStyle={{ lineHeight: 28, marginBottom: 4 }}
          />
          <View>
            <BasicText
              size={'16@ms0.3'}
              color={color.GrayscaleSecondaryText}
              text={'소중한 나의 작물이 잘 자랄 수 있게'}
              otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
            />
            <BasicText
              size={'16@ms0.3'}
              color={color.GrayscaleSecondaryText}
              text={'잘키움으로 관리해보세요'}
              otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
            />
          </View>
        </View>
        <View>
          <View style={styles.checkboxAllStyle}>
            <CircleCheckbox
              isChecked={toggleCheckBoxAll}
              onToggleCheckbox={onToggleCheckboxAll}
              text="약관 전체동의"
            />
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxService}
              onToggleCheckbox={onToggleCheckboxService}
              text="서비스 이용약관 동의(필수)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('UserAgreement')}
                text="보기"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxPrivateInfo}
              onToggleCheckbox={onToggleCheckboxPrivateInfo}
              text="개인정보 제공 동의(필수)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('PersonalInfoPolicy')}
                text="보기"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxLocation}
              onToggleCheckbox={onToggleCheckboxLocation}
              text="위치정보 제공 동의(선택)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('LocationServicePolicy')}
                text="보기"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxMarketing}
              onToggleCheckbox={onToggleCheckboxMarketing}
              text="마케팅수신 동의(선택)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('LocationServicePolicy')}
                text="보기"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        {toggleCheckBoxService === false || toggleCheckBoxPrivateInfo === false ? (
          <PageButton disabled={true} title="동의하기" onPress={onSubmit} />
        ) : (
          <PageButton title="동의하기" onPress={onSubmit} />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  subContainer: {
    flex: 1,
    padding: '16@ms',
  },
  titleLayout: {
    marginVertical: '19@ms',
    marginLeft: 3,
  },
  checkboxAllStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.PrimaryP70,
    width: '100%',
    paddingLeft: '13.6@ms',
    paddingVertical: '18@ms',
    marginBottom: '18@ms',
  },
  checkboxRowStyle: {
    marginLeft: '13@ms',
    marginRight: '10@ms',
    marginBottom: '22@ms',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textRowStyle: {
    flexDirection: 'row',
  },
  infoButtonLayout: {
    borderBottomWidth: 1,
    borderColor: color.GrayscaleDisabledText,
  },
});
export default Signup;
