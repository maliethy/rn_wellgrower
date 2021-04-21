import React, { ReactElement, useState, useCallback } from 'react';
import { color } from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';
import CheckGray from '~/Assets/Icons/check_gray.svg';
import { ScaledSheet } from 'react-native-size-matters';

type checkboxProps = {
  isChecked: boolean;
  onToggleCheckbox: () => void;
  text: string;
};
function SquareCheckbox({ isChecked, onToggleCheckbox, text }: checkboxProps): ReactElement {
  return (
    <CheckBox
      style={{
        width: 90,
        height: '100%',
      }}
      rightTextStyle={styles.rightTextStyle}
      rightText={text}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={isChecked}
      checkedImage={
        <View
          style={{
            backgroundColor: color.PrimaryP900,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: color.PrimaryP900,
          }}>
          <View style={{ position: 'relative', top: 0, left: 0 }}>
            <CheckWhite style={styles.iconSize} />
          </View>
        </View>
      }
      unCheckedImage={
        <View
          style={{
            borderRadius: 3,
            borderColor: color.GrayscaleBorder,
            borderWidth: 1,
          }}>
          <CheckGray style={styles.iconSize} />
        </View>
      }
    />
  );
}
export default SquareCheckbox;
const styles = ScaledSheet.create({
  rightTextStyle: {
    color: color.PrimaryDark,
    fontSize: '12@ms',
    fontFamily: 'NotoSansKR-Regular',
    lineHeight: 16,
    letterSpacing: -0.6,
    position: 'absolute',
    top: 2,
    left: 13,
  },
  iconSize: { width: '16@ms', height: '16@ms' },
});
