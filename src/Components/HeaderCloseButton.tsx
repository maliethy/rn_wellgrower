import React from 'react';
import { TouchableOpacity } from 'react-native';
import ClosePrimary from '~/Assets/Icons/close_primary.svg';
import { useNavigation, StackActions } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';

const HeaderCloseButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.dispatch(StackActions.popToTop())}>
      <ClosePrimary style={styles.iconSize} />
    </TouchableOpacity>
  );
};
export default HeaderCloseButton;
const styles = ScaledSheet.create({
  container: {
    width: '24@ms',
    height: '24@ms',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSize: { width: '16@ms', height: '16@ms' },
});
