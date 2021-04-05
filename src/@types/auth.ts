import { StackNavigationProp } from '@react-navigation/stack';

export enum AuthScreens {
  Login = 'Login',
  Welcome = 'Welcome',
  CustomCenter = 'CustomCenter',
  FindPassword = 'FindPassword',
  AddAddress = 'AddAddress',

  Signup = 'Signup',
  Certification = 'Certification',
}
// export type SignupParams = {};
export type AuthStackParamList = {
  Login: undefined;
  Welcome: undefined;
  CustomCenter: undefined;
  FindPassword: undefined;
  AddAddress: { [key: string]: string };

  Signup: undefined;
  Certification: undefined;
  UserAgreement: undefined;
  PersonalInfoPolicy: undefined;
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
