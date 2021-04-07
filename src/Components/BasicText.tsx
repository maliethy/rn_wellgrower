import React, { ReactElement } from 'react';
import { BasicText } from '~/styles';

type BasicTextProps = {
  onPress?: () => void | undefined;
  text: string;
  en?: boolean;
  bold?: boolean;
  color: string;
  size: string;
};

function BasicText({ onPress, text, color, size }: BasicTextProps): ReactElement {
  return (
    <BasicText en bold color={color} size={size} onPress={onPress}>
      {text}
    </BasicText>
  );
}
export default BasicText;
