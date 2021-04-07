import styled, { css } from '@emotion/native';

export const ButtonContainer = styled.TouchableOpacity`
  padding-vertical: 6px;
  background-color: #005500;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  align-self: center;
  font-family: 'NotoSansKR-Regular';
`;

type TextProps = {
  bold?: boolean;
  en?: boolean;
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
      font-family: 'NanumGothic';
    `}
  ${(props: TextProps) =>
    props.en &&
    props.bold &&
    css`
      font-family: 'NanumGothic';
    `}
`;

export const KOText = styled.Text`
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
`;
export default {
  inputLine: '#e6eeeeee',
  ordinaryText: '#94050709',
  disabledText: '#66999999',
  disabledBorder: '#99cccccc',
  grayLine: '#e6eeeeee',
  primary: '#005500',
  lightGrey: '#94050709',
  greyText: '#ED4956',
  keyboardButton: '#47b6ad',
  failRed: '#b50000',
};
