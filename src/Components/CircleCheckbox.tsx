import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';

type checkboxProps = {
  isChecked: boolean;
  onToggleCheckbox: () => void;
  text: string;
  rightTextStyle: Record<string, unknown>;
};
function CircleCheckbox({
  isChecked,
  onToggleCheckbox,
  text,
  rightTextStyle,
}: checkboxProps): ReactElement {
  return (
    <CheckBox
      style={{ flex: 1 }}
      rightTextStyle={rightTextStyle ? rightTextStyle : { color: color.PrimaryDark, fontSize: 12 }}
      rightText={text}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={isChecked}
      checkedImage={
        <View
          style={{
            padding: 4,
          }}>
          <View
            style={{
              backgroundColor: color.PrimaryLight,
              borderRadius: 100,
              borderColor: color.PrimaryLight,
              borderWidth: 1,
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckWhite width={11} height={11} />
          </View>
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
