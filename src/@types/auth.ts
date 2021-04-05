import { StackNavigationProp } from '@react-navigation/stack';

export enum AuthScreens {
  Login = 'Login',
  Signup = 'Signup',
  Welcome = 'Welcome',
  CustomCenter = 'CustomCenter',
  FindPassword = 'FindPassword',
  AddAddress = 'AddAddress',
}
// export type SignupParams = {};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  CustomCenter: undefined;
  FindPassword: undefined;
  AddAddress: { [key: string]: string };
};
export type Route = {
  key: string;
  name: string;
  params?: string;
};

export type LoginNavigationProps = StackNavigationProp<AuthStackParamList, AuthScreens>;
export interface LoginProps {
  route: { params: string };
  navigation: LoginNavigationProps;
}
