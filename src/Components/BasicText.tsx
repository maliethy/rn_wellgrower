import React, { ReactElement } from 'react';
import { color as BasicColor, BasicTextStyle } from '~/styles';
import { ScaledSheet } from 'react-native-size-matters';

type BasicTextProps = {
  onPress?: () => void | undefined;
  text: string;
  color?: string;
  en?: boolean;
  bold?: boolean;
  size?: string;
  ios?: boolean;
  otherStyle?: Record<never, number>;
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
  const styles = ScaledSheet.create({
    textStyle: {
      fontSize: size ? size : '12@ms',
      color: color ? color : BasicColor.GrayscalePrimaryText,
    },
  });
  return (
    <BasicTextStyle bold={bold} ios={ios} style={[styles.textStyle, otherStyle]} onPress={onPress}>
      {text}
    </BasicTextStyle>
  );
}
export default BasicText;
