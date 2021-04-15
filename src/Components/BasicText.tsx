import React, { ReactElement } from 'react';
import basicColor, { BasicTextStyle } from '~/styles';
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
      fontSize: size ? size : '12@ms0.3',
      color: color ? color : basicColor.GrayscalePrimaryText,
    },
  });
  return (
    <BasicTextStyle bold={bold} ios={ios} style={[otherStyle, styles.textStyle]} onPress={onPress}>
      {text}
    </BasicTextStyle>
  );
}
export default BasicText;
