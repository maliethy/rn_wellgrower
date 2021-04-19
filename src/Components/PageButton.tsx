import React, { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { color, styles, ButtonText } from '~/styles';
import { s, vs, ms, mvs } from 'react-native-size-matters';

type PageButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function PageButton({ onPress, title, disabled }: PageButtonProps): ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.pageButtonContainer,
        { backgroundColor: disabled ? color.GrayscaleDisabledText : color.PrimaryP900 },
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
export default PageButton;
