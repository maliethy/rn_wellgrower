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
          <View style={{ position: 'relative', top: 0, left: 0 }}>
            <CheckPrimary style={styles.iconSize} />
          </View>
        </View>
      }
      unCheckedImage={
        <View
          style={{
            borderRadius: 3,
            borderWidth: 0,
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
    borderRadius: 100,
    borderWidth: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '20@ms',
    height: '20@ms',
  },
  unCheckedImageInnerView: {
    borderRadius: 100,
    borderColor: color.GrayscaleBorder,
    borderWidth: 1,
    width: '20@ms',
    height: '20@ms',
  },
  iconSize: { width: '11@ms', height: '11@ms', position: 'absolute', top: -3, left: -12 },
  rightTextStyle: {
    color: color.GrayscaleSecondaryText,
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: -0.6,
    fontFamily: 'NotoSansKR-Regular',
    position: 'absolute',
    top: 2,
    left: 24,
  },
});
