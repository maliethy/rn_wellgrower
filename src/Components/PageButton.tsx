import React, { ReactElement } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { color, styles } from '~/styles';
import { s, vs, ms, mvs } from 'react-native-size-matters';

type PageButtonProps = {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
};

function PageButton({ onPress, title, disabled }: PageButtonProps): ReactElement {
  return (
    <>
      {disabled ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={[styles.pageButtonContainer, { backgroundColor: color.GrayscaleDisabledText }]}>
            <Text style={styles.buttonTextBold}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableOpacity
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          onPress={onPress}
          style={styles.pageButtonContainer}>
          <Text style={styles.buttonTextBold}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
export default PageButton;
