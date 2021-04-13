import React, { ReactElement } from 'react';

import color, { PageButtonContainer, ButtonText } from '~/styles';

type PageButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

function PageButton({ onPress, title, disabled }: PageButtonProps): ReactElement {
  return (
    <PageButtonContainer
      onPress={onPress}
      style={{ backgroundColor: disabled ? color.GrayscaleDisabledText : color.PrimaryP900 }}>
      <ButtonText>{title}</ButtonText>
    </PageButtonContainer>
  );
}
export default PageButton;
