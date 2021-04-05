import 'react-native-gesture-handler';
import * as React from 'react';
import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingList from '~/Screens/Tabs/SettingList';
import Notice from '~/Screens/Setting/Notice';
import VersionInfo from '~/Screens/Setting/VersionInfo';
import PrivateInfo from '~/Screens/Setting/PrivateInfo/index';
import SettingAlarm from '~/Screens/Setting/Alarm/index';
import AlarmType from '~/Screens/Setting/Alarm/AlarmType';
import CustomCenter from '~/Screens/Setting/CustomCenter/index';
import Logout from '~/Screens/Setting/Logout';

import Withdrawal from '~/Screens/Setting/PrivateInfo/Withdrawal';
import WithdrawalReason from '~/Screens/Setting/PrivateInfo/Withdrawal/Reason';
import WithdrawalGrace from '~/Screens/Setting/PrivateInfo/Withdrawal/Grace';

import ChangePhone from '~/Screens/Setting/PrivateInfo/ChangePhone';
import AddressForm from '~/Components/AddressForm';
import PostcodeModal from '~/Components/PostcodeModal';
import ChangePassword from '~/Screens/Setting/PrivateInfo/ChangePassword';

import Help from '~/Screens/Setting/CustomCenter/Help';
import Consult from '~/Screens/Setting/CustomCenter/Consult';
import ConsultForm from '~/Screens/Setting/CustomCenter/Consult/ConsultForm';
import UserAgreement from '~/Screens/Setting/CustomCenter/UserAgreement';
import PersonalInfoPolicy from '~/Screens/Setting/CustomCenter/PersonalInfoPolicy';
import LocationServicePolicy from '~/Screens/Setting/CustomCenter/LocationServicePolicy';
import OperationPolicy from '~/Screens/Setting/CustomCenter/OperationPolicy';

const SettingStack = createStackNavigator();

const settingScreens = {
  SettingList: SettingList,
  Notice: Notice,
  VersionInfo: VersionInfo,
  PrivateInfo: PrivateInfo,
  SettingAlarm: SettingAlarm,
  CustomCenter: CustomCenter,
  Logout: Logout,
};

const privateInfoScreens = {
  Withdrawal: Withdrawal,
  WithdrawalReason: WithdrawalReason,
  WithdrawalGrace: WithdrawalGrace,
  ChangePhone: ChangePhone,
  ChangeAddress: AddressForm,
  PostcodeModal: PostcodeModal,
  ChangePassword: ChangePassword,
};

const customCenterScreens = {
  Help: Help,
  Consult: Consult,
  ConsultForm: ConsultForm,
  UserAgreement: UserAgreement,
  PersonalInfoPolicy: PersonalInfoPolicy,
  LocationServicePolicy: LocationServicePolicy,
  OperationPolicy: OperationPolicy,
};
const AlarmSetting = {
  SettingAlarm: SettingAlarm,
  AlarmType: AlarmType,
};

const SettingNavigation: FC = () => {
  return (
    <SettingStack.Navigator headerMode="screen" initialRouteName="SettingList">
      {Object.entries({
        ...settingScreens,
        ...privateInfoScreens,
        ...customCenterScreens,
        ...AlarmSetting,
      }).map(([name, component]) => {
        return <SettingStack.Screen key={name} name={name} component={component} />;
      })}
    </SettingStack.Navigator>
  );
};
export default SettingNavigation;
