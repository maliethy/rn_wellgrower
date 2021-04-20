import React, { ReactElement, useState, useCallback } from 'react';

import { color } from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckPrimary from '~/Assets/Icons/check_primary.svg';
import { ScaledSheet } from 'react-native-size-matters';
import { s, vs, ms, mvs } from 'react-native-size-matters';

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
          <CheckPrimary width={ms(27)} height={ms(27)} />
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
            backgroundColor: color.GrayscaleWash,
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
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: -0.6,
    marginLeft: '17@ms',
    fontFamily: 'NotoSansKR-Regular',
  },
  checkedImageView: {
    borderRadius: 100,
    borderWidth: 0,
    width: '26@ms',
    height: '26@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckedImageInnerView: {
    borderRadius: 100,
    borderColor: color.GrayscaleBorder,
    borderWidth: 1,
    width: '18@ms',
    height: '18@ms',
  },
  iconSize: { width: '16@ms', height: '16@ms' },
});
