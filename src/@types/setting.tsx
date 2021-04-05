import { StackNavigationProp } from '@react-navigation/stack';

export enum SettingScreens {
  SettingList = 'SettingList',
  Notice = 'Notice',
  VersionInfo = 'VersionInfo',
  PrivateInfo = 'PrivateInfo',
  AlarmSetting = 'AlarmSetting',
  CustomCenter = 'CustomCenter',
  Logout = 'Logout',
  Withdrawal = 'Withdrawal',
  WithdrawalReason = 'WithdrawalReason',
  WithdrawalGrace = 'WithdrawalGrace',
  ChangePhone = 'ChangePhone',
  ChangeAddress = 'ChangeAddress',
  ChangePassword = 'ChangePassword',

  Help = 'Help',
  Consult = 'Consult',
  ConsultForm = 'ConsultForm',
  Agreement = 'Agreement',
  PersonalInfoPolicy = 'PersonalInfoPolicy',
  LocationServicePolicy = 'LocationServicePolicy',
  OperationPolicy = 'OperationPolicy',
}
// export type NoticeParams = {};
export type SettingStackParamList = {
  SettingList: undefined;
  Notice: undefined;
  VersionInfo: undefined;
  PrivateInfo: undefined;
  AlarmSetting: undefined;
  CustomCenter: undefined;
  Logout: undefined;
  Withdrawal: undefined;
  WithdrawalReason: undefined;
  WithdrawalGrace: undefined;

  ChangePhone: undefined;
  ChangeAddress: { [key: string]: string };
  ChangePassword: { [key: string]: string };
  PostcodeModal: undefined;
  Help: undefined;
  Consult: undefined;
  ConsultForm: undefined;
  Agreement: undefined;
  PersonalInfoPolicy: undefined;
  LocationServicePolicy: undefined;
  OperationPolicy: undefined;
};
export type Route = {
  key: string;
  name: string;
  params?: string;
};

export type SettingNavigationProps = StackNavigationProp<SettingStackParamList, SettingScreens>;
export interface SettingProps {
  route: { params: { [key: string]: string } };
  navigation: SettingNavigationProps;
}

export interface itemProps {
  id: number;
  title: string;
  screenName: string;
}
export interface ItemComponentProps {
  item: itemProps;
  onPress(): unknown;
  style?: { [key: string]: unknown };
}
