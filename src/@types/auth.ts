import { StackNavigationProp } from '@react-navigation/stack';

export enum AuthScreens {
  Login = 'Login',
  CustomCenter = 'CustomCenter',
  FindPassword = 'FindPassword',
  AddAddress = 'AddAddress',
  Signup = 'Signup',
}
export type AuthStackParamList = {
  Login: undefined;
  CustomCenter: undefined;
  FindPassword: undefined;
  AddAddress: { [key: string]: string };
  Signup: undefined;
};
export enum SignupScreens {
  Signup = 'Signup',
  Certification = 'Certification',
  CertificationResult = 'CertificationResult',
  InputPassword = 'InputPassword',
  InputAddress = 'InputAddress',
  Welcome = 'Welcome',
  UserAgreement = 'UserAgreement',
  PersonalInfoPolicy = 'PersonalInfoPolicy',
  LocationServicePolicy = 'LocationServicePolicy',
  MarketingPolicy = 'MarketingPolicy',
}
export type SignupStackParamList = {
  Signup: undefined;
  MarketingPolicy: undefined;
  UserAgreement: undefined;
  PersonalInfoPolicy: undefined;
  LocationServicePolicy: undefined;
  Certification: Record<string, unknown> | undefined;
  CertificationResult: Record<string, unknown> | undefined;
  InputPassword: unknown;
  InputAddress: undefined;
  Welcome: undefined;
};

export type Route = {
  params?: { [key: string]: string | boolean };
};

export type AuthNavigationProps = StackNavigationProp<AuthStackParamList, AuthScreens>;
export interface AuthProps {
  route: Route;
  navigation: AuthNavigationProps;
}
export type SignupNavigationProps = StackNavigationProp<SignupStackParamList, SignupScreens>;
export interface SignupProps {
  route: Route;
  navigation: SignupNavigationProps;
}
