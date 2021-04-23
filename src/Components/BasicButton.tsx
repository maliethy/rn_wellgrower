import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { color, styles } from '~/styles';

type BasicButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
};

function BasicButton({ onPress, title, disabled }: BasicButtonProps): ReactElement {
  return (
    <>
      {disabled ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[styles.buttonContainer, { backgroundColor: color.GrayscaleDisabledText }]}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          onPress={onPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
export default BasicButton;
