import styled, { css } from '@emotion/native';
export const barStyles = styled.View`
  background-color: #fafafa;
`;
type CloseButtonCoordProps = {
  reason?: boolean;
};
export const CloseButtonCoord = styled.Text`
  position: absolute;
  right: 50px;
  top: 16px;
  ${(props: CloseButtonCoordProps) =>
    props.reason &&
    css`
      right: 20px;
      top: 13px;
    `}
`;
export const CloseButtonCoordForTextArea = styled.Text`
  position: absolute;
  right: 0px;
  top: 16px;
`;
export default {
  blackColor: '#262626',
  greyColor: '#FAFAFA',
  darkGreyColor: '#999',
  lightGreyColor: 'rgb(230, 230, 230)',
  redColor: '#ED4956',
  blueColor: '#3897f0',
  darkBlueColor: '#003569',
};
