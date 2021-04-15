import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';
import { ScaledSheet } from 'react-native-size-matters';

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
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
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
          <View style={styles.checkedImageView}>
            <CheckWhite width={'11@s'} height={'11@s'} />
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
          <View style={styles.unCheckedImageInnerView} />
        </View>
      }
    />
  );
}
export default CircleCheckbox;
const styles = ScaledSheet.create({
  checkedImageView: {
    backgroundColor: color.PrimaryLight,
    borderRadius: 100,
    borderColor: color.PrimaryLight,
    borderWidth: 1,
    width: '16@ms',
    height: '16@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckedImageInnerView: {
    borderRadius: 100,
    borderColor: color.GrayscaleBorder,
    borderWidth: 1,
    width: '16@ms',
    height: '16@ms',
  },
});
