import React, { FC, useEffect } from 'react';
import IMP from 'iamport-react-native';
import { Button } from 'react-native';
import GoToButton from '~/Components/GoToButton';
import Loader from '~/Components/Loader';
import { SignupProps } from '~/@types/auth';
export const Certification: FC<SignupProps> = ({ route, navigation }) => {
  const { comeFrom } = route.params;
  /* [필수입력] 본인인증 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  const reqTest = {
    success: true,
    imp_uid: '0123131',
    merchant_uid: '0316545',
    error_msg: 'error',
  };
  function callback(response) {
    navigation.replace('CertificationResult', {
      response,
      user_phone: data.phone,
      comeFrom: comeFrom,
    });
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: '아임포트',
    carrier: 'SKT',
    name: '홍길동',
    phone: '01012341234',
    min_age: '',
  };
  useEffect(() => {
    comeFrom === 'Login' &&
      navigation.setOptions({
        headerTitle: '비밀번호 재설정',
      });
  }, []);

  return (
    <>
      <Button
        title="CertificationResult"
        onPress={() =>
          navigation.navigate('CertificationResult', { reqTest, user_phone: data.phone, comeFrom })
        }
      />
      <IMP.Certification
        userCode={'imp90785256'} // 가맹점 식별코드
        tierCode={'AAA'} // 티어 코드: agency 기능 사용자에 한함
        loading={<Loader />} // 웹뷰 로딩 컴포넌트
        data={data} // 본인인증 데이터
        callback={callback} // 본인인증 종료 후 콜백
      />
    </>
  );
};

export default Certification;
