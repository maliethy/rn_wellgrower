import React, { ReactElement, useState, useCallback } from 'react';

import { color } from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';
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
          <CheckWhite style={styles.iconSize} />
        </View>
      }
      unCheckedImage={
        <View
          style={{
            borderRadius: 100,
            borderWidth: 0,
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
  checkedImageView: {
    backgroundColor: color.PrimaryP900,
    borderColor: color.PrimaryP900,
    borderRadius: 100,
    borderWidth: 1,
    width: '20@ms',
    height: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckedImageInnerView: {
    borderRadius: 100,
    borderColor: color.GrayscaleBorder,
    borderWidth: 1,
    width: '20@ms',
    height: '20@ms',
  },
  iconSize: { width: '11@s', height: '11@s' },
  rightTextStyle: {
    marginLeft: '12@ms',
    color: '#000',
    fontSize: '16@ms',
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: '22@ms',
    letterSpacing: -0.6,
  },
});
