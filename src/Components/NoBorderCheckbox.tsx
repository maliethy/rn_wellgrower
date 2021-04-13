import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckPrimary from '~/Assets/Icons/check_primary.svg';
import CheckWhite from '~/Assets/Icons/check_white.svg';

type checkboxProps = {
  isChecked: boolean;
  onToggleCheckbox: () => void;
  text: string;
};
function CircleCheckbox({ isChecked, onToggleCheckbox, text }: checkboxProps): ReactElement {
  return (
    <CheckBox
      style={{ flex: 1 }}
      rightTextStyle={{
        color: color.GrayscaleSecondaryText,
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: -0.6,
        marginLeft: 17,
      }}
      rightText={text}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={isChecked}
      checkedImage={
        <View
          style={{
            borderRadius: 100,
            borderWidth: 0,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckPrimary width={16} height={16} />
        </View>
      }
      unCheckedImage={
        <View
          style={{
            borderRadius: 100,
            borderWidth: 0,
            padding: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 100,
              borderColor: color.GrayscaleBorder,
              borderWidth: 1,
              width: 16,
              height: 16,
            }}
          />
        </View>
      }
    />
  );
}
export default CircleCheckbox;
