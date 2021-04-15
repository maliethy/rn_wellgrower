import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckPrimary from '~/Assets/Icons/check_primary.svg';
import { ScaledSheet } from 'react-native-size-matters';

type checkboxProps = {
  isChecked: boolean;
  onToggleCheckbox: () => void;
  text: string;
};
function CircleCheckbox({ isChecked, onToggleCheckbox, text }: checkboxProps): ReactElement {
  return (
    <CheckBox
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      rightTextStyle={styles.rightTextStyle}
      rightText={text}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={isChecked}
      checkedImage={
        <View style={styles.checkedImageView}>
          <CheckPrimary style={styles.iconSize} />
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
  rightTextStyle: {
    color: color.GrayscaleSecondaryText,
    fontSize: '14@ms0.3',
    lineHeight: '18@ms',
    letterSpacing: -0.6,
    marginLeft: '17@ms',
  },
  checkedImageView: {
    borderRadius: 100,
    borderWidth: 0,
    width: '24@ms',
    height: '24@ms',
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
  iconSize: { width: '16@ms', height: '16@ms' },
});
