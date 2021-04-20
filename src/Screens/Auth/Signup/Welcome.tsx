import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import BasicText from '~/Components/BasicText';
import PageButton from '~/Components/PageButton';
import WelcomeFarmer from '~/Assets/Icons/welcome.svg';

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <WelcomeFarmer width={ms(200)} height={ms(200)} />
        <View style={styles.title}>
          <BasicText
            bold={true}
            size={'20@ms'}
            text="잘키움에 오신 것을 "
            otherStyle={{ lineHeight: 28, textAlign: 'left' }}
          />
          <BasicText
            bold={true}
            size={'20@ms'}
            text="환영합니다"
            otherStyle={{ lineHeight: 28, textAlign: 'left' }}
          />
        </View>
      </View>
      <View>
        <PageButton
          title="다음"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: '8@ms',
  },
  subContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '25%',
  },
});
export default Welcome;
