import React, { ReactElement } from 'react';
import color, { ButtonContainer, ButtonText } from '~/styles';

type BasicButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function BasicButton({ onPress, title, disabled }: BasicButtonProps): ReactElement {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{ backgroundColor: disabled ? color.GrayscaleDisabledText : '#005500' }}>
      <ButtonText style={{ fontSize: 16 }}>{title}</ButtonText>
    </ButtonContainer>
  );
}
export default BasicButton;
