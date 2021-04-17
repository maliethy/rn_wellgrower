import React from 'react';
import IMP from 'iamport-react-native';

import Loader from '~/Components/Loader';

export default function Certification({ navigation }) {
  const params = navigation.getParam('params');

  const userCode = getUserCode('danal', imp90785256, 'certification');

  return (
    <IMP.Certification
      userCode={userCode}
      tierCode={imp90785256}
      loading={<Loader />}
      data={params}
      callback={(response) => navigation.replace('InputPassword', { response })}
    />
  );
}
