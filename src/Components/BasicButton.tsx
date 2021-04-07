import React, { ReactElement } from 'react';
import { ButtonContainer, ButtonText } from '~/styles';

type BasicButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function BasicButton({ onPress, title, disabled }: BasicButtonProps): ReactElement {
  return (
    <ButtonContainer
      onPress={onPress}
      style={{ backgroundColor: disabled ? '#66999999' : '#005500' }}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}
export default BasicButton;
