import React, { ReactElement, useState, useCallback } from 'react';

import color from '~/styles';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box';
import CheckWhite from '~/Assets/Icons/check_white.svg';
import CheckGray from '~/Assets/Icons/check_gray.svg';
function SquareCheckbox(): ReactElement {
  const [toggleCheckBox, setToggleCheckbox] = useState(true);
  const onToggleCheckbox = useCallback(() => {
    setToggleCheckbox((prev) => !prev);
  }, []);

  return (
    <CheckBox
      style={{ padding: 10 }}
      rightTextStyle={{ color: color.PrimaryDark }}
      rightText={'자동로그인'}
      onClick={onToggleCheckbox}
      checkBoxColor={color.StatusFail}
      isChecked={toggleCheckBox}
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
