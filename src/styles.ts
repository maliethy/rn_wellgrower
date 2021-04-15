import styled, { css } from '@emotion/native';

export const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 1px;
  background-color: #005500;
  border-radius: 4px;
`;
export const PageButtonContainer = styled.TouchableOpacity`
  padding-vertical: 16px;
  background-color: #005500;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'NotoSansKR-Regular';
`;
export const InputIconCoord = styled.Text`
  position: absolute;
  right: 9px;
  top: 3px;
`;
type TextProps = {
  bold?: boolean;
  en?: boolean;
  ios?: boolean;
};
export const BasicTextStyle = styled.Text`
  font-family: 'NotoSansKR-Regular';
  ${(props: TextProps) =>
    props.bold &&
    css`
      font-family: 'NotoSansKR-Bold';
    `}

  ${(props: TextProps) =>
    props.en &&
    css`
      font-family: 'NanumGothic-Regular';
    `}
  ${(props: TextProps) =>
    props.en &&
    props.bold &&
    css`
      font-family: 'NanumGothic-Bold';
    `}
  ${(props: TextProps) =>
    props.ios &&
    props.en &&
    css`
      font-family: 'NanumGothic';
    `}
  ${(props: TextProps) =>
    props.ios &&
    props.en &&
    props.bold &&
    css`
      font-family: 'NanumGothic';
    `}
`;

export default {
  GrayscaleLine: 'rgba(238, 238, 238,.9)',
  GrayscaleDisabledText: 'rgba(153, 153, 153,.4)',
  GrayscaleBorder: 'rgba(204, 204, 204,.6)',
  GrayscalePrimaryText: 'rgba(5, 7, 9,.9)',
  GrayscaleBubble: 'rgba(0, 0, 0,.2)',
  GrayscaleSecondaryText: 'rgba(5, 7, 9,0.58)',
  PrimaryDark: '#002b00',
  PrimaryLight: '#3d832f',
  GrayscaleWash: 'rgba(254, 254, 254,.9)',
  PrimaryP70: '#e7f4e6',
  PrimaryP700: '#2a8420',
  PrimaryP900: '#005500',
  PrimaryP800: '#1e7315',
  PrimaryP500: '#40a433',
  PrimaryP300: '#79be71',
  PrimaryP400: '#5db152',
  PrimaryP600: '#37952a',
  PrimaryP200: '#a0d099',
  PrimaryP100: '#c5e2c1',
  SecondaryS900: '#878900',
  SecondaryDark: '#94bf00',
  SecondaryS700: '#aec80f',
  SecondaryLight: '#ffff64',
  SecondaryS800: '#9fb000',
  PrimaryP50: '#e7f4e6',
  SecondaryS100: '#effbc4',
  SecondaryS200: '#e5fa9c',
  SecondaryS600: '#bedf1e',
  SecondaryS500: '#c9f227',
  SecondaryS400: '#d1f450',
  SecondaryS300: '#daf873',
  SecondaryS50: '#f9fee7',
  StatusAlert: '#d43900',
  StatusSuccess: '#1f3a93',
  StatusFail: '#b50000',
  KeyboardButton: '#47b6ad',
};
