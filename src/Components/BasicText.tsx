import React, { ReactElement } from 'react';
import { BasicTextStyle } from '~/styles';

type BasicTextProps = {
  onPress?: () => void | undefined;
  text: string;
  en?: boolean;
  bold?: boolean;
  size?: number;
};

function BasicText({ onPress, text, size }: BasicTextProps): ReactElement {
  return (
    <BasicTextStyle en bold style={{ fontSize: size ? size : 12 }} onPress={onPress}>
      {text}
    </BasicTextStyle>
  );
}
export default BasicText;
