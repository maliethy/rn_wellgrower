import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { color, styles } from '~/styles';

type BasicButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function SmallButton({ onPress, title, disabled }: BasicButtonProps): ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.smallButtonContainer, { width: ms(88), height: ms(36), padding: 10 }]}>
      <Text style={styles.smallButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}
export default SmallButton;
