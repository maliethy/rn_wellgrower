import { StackNavigationProp } from '@react-navigation/stack';

export enum AuthScreens {
  Login = 'Login',

  CustomCenter = 'CustomCenter',
  FindPassword = 'FindPassword',
  AddAddress = 'AddAddress',

  Signup = 'Signup',
  Certification = 'Certification',
  InputPassword = 'InputPassword',
  InputAddress = 'InputAddress',
  Welcome = 'Welcome',
  UserAgreement = 'UserAgreement',
  PersonalInfoPolicy = 'PersonalInfoPolicy',
  LocationServicePolicy = 'LocationServicePolicy',
  MarketingPolicy = 'MarketingPolicy',
}
// export type SignupParams = {};
export type AuthStackParamList = {
  Login: undefined;
  CustomCenter: undefined;
  FindPassword: undefined;
  AddAddress: { [key: string]: string };

  Signup: undefined;
  MarketingPolicy: undefined;
  UserAgreement: undefined;
  PersonalInfoPolicy: undefined;
  LocationServicePolicy: undefined;
  Certification: undefined;
  InputPassword: undefined;
  InputAddress: undefined;
  Welcome: undefined;
};
export type Route = {
  key: string;
  name: string;
  params?: string;
};

export type AuthNavigationProps = StackNavigationProp<AuthStackParamList, AuthScreens>;
export interface AuthProps {
  route: { params: string };
  navigation: AuthNavigationProps;
}
