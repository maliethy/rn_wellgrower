import React, { ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { color, styles } from '~/styles';

type BasicButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function BasicButton({ onPress, title, disabled }: BasicButtonProps): ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? color.GrayscaleDisabledText : color.PrimaryP900 },
      ]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
export default BasicButton;
