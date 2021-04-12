import React, { ReactElement } from 'react';
import basicColor, { BasicTextStyle } from '~/styles';

type BasicTextProps = {
  onPress?: () => void | undefined;
  text: string;
  color?: string;
  en?: boolean;
  bold?: boolean;
  size?: number;
  ios?: boolean;
  otherStyle?: Record<string, unknown>;
};

function BasicText({
  onPress,
  text,
  otherStyle,
  size,
  color,
  bold,
  ios,
}: BasicTextProps): ReactElement {
  return (
    <BasicTextStyle
      bold={bold}
      ios={ios}
      style={[
        otherStyle,
        { fontSize: size ? size : 12, color: color ? color : basicColor.GrayscalePrimaryText },
      ]}
      onPress={onPress}>
      {text}
    </BasicTextStyle>
  );
}
export default BasicText;
