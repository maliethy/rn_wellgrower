import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';
import CheckGray from '~/Assets/Icons/check_gray.svg';

type checkboxProps = {
  isChecked: boolean;
  onToggleCheckbox: () => void;
  text: string;
};
function SquareCheckbox({ isChecked, onToggleCheckbox, text }: checkboxProps): ReactElement {
  return (
    <CheckBox
      style={{ flex: 1 }}
      rightTextStyle={{ color: color.PrimaryDark, fontSize: 12 }}
      rightText={text}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={isChecked}
      checkedImage={
        <View
          style={{
            backgroundColor: color.PrimaryLight,
            borderRadius: 3,
            borderColor: color.PrimaryLight,
            borderWidth: 1,
          }}>
          <CheckWhite width={16} height={16} />
        </View>
      }
      unCheckedImage={
        <View
          style={{
            borderRadius: 3,
            borderColor: color.GrayscaleBorder,
            borderWidth: 1,
          }}>
          <CheckGray width={16} height={16} />
        </View>
      }
    />
  );
}
export default SquareCheckbox;
