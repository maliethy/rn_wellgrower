import * as React from 'react';
import { useCallback, useState, useEffect, FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import { SignupProps } from '~/@types/auth';
import CircleCheckbox from '~/Components/CircleCheckbox';
import NoBorderCheckbox from '~/Components/NoBorderCheckbox';
import PageButton from '~/Components/PageButton';
import BasicText from '~/Components/BasicText';
import { color } from '~/styles';
import { ScaledSheet } from 'react-native-size-matters';

const Signup: FC<SignupProps> = ({ navigation }) => {
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
        '????????????',
        toggleCheckBoxService,
        toggleCheckBoxPrivateInfo,
        toggleCheckBoxLocation,
        toggleCheckBoxMarketing,
      );
      navigation.navigate('Certification', { comeFrom: 'Signup' });
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
            size={'20@ms'}
            color={color.PrimaryP900}
            text="????????????"
            otherStyle={{ lineHeight: 28, marginBottom: 4 }}
          />
          <View>
            <BasicText
              size={'16@ms'}
              color={color.GrayscaleSecondaryText}
              text={'????????? ?????? ????????? ??? ?????? ??? ??????'}
              otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
            />
            <BasicText
              size={'16@ms'}
              color={color.GrayscaleSecondaryText}
              text={'??????????????? ??????????????????'}
              otherStyle={{ lineHeight: 26, letterSpacing: -0.6 }}
            />
          </View>
        </View>
        <View>
          <View style={styles.checkboxAllStyle}>
            <CircleCheckbox
              isChecked={toggleCheckBoxAll}
              onToggleCheckbox={onToggleCheckboxAll}
              text="?????? ????????????"
            />
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxService}
              onToggleCheckbox={onToggleCheckboxService}
              text="????????? ???????????? ??????(??????)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('UserAgreement')}
                text="??????"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxPrivateInfo}
              onToggleCheckbox={onToggleCheckboxPrivateInfo}
              text="???????????? ?????? ??????(??????)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('PersonalInfoPolicy')}
                text="??????"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxLocation}
              onToggleCheckbox={onToggleCheckboxLocation}
              text="???????????? ?????? ??????(??????)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('LocationServicePolicy')}
                text="??????"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
          <View style={styles.checkboxRowStyle}>
            <NoBorderCheckbox
              isChecked={toggleCheckBoxMarketing}
              onToggleCheckbox={onToggleCheckboxMarketing}
              text="??????????????? ??????(??????)"
            />

            <View style={styles.infoButtonLayout}>
              <BasicText
                color={color.GrayscaleDisabledText}
                onPress={() => navigation.navigate('LocationServicePolicy')}
                text="??????"
                otherStyle={{ lineHeight: 16, letterSpacing: -0.6 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        {toggleCheckBoxService === false || toggleCheckBoxPrivateInfo === false ? (
          <PageButton disabled={true} title="????????????" onPress={onSubmit} />
        ) : (
          <PageButton title="????????????" onPress={onSubmit} />
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
    width: '100%',
    height: '100%',
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
    paddingLeft: '11@ms',
    paddingVertical: '18@ms',
    marginBottom: '18@ms',
    borderRadius: 4,
  },
  checkboxRowStyle: {
    marginLeft: '11@ms',
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
