import React from 'react';
import { TouchableOpacity } from 'react-native';
import ClosePrimary from '~/Assets/Icons/close_primary.svg';
import { useNavigation, StackActions } from '@react-navigation/native';

const HeaderCloseButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: 24, height: 24 }}
      onPress={() => navigation.dispatch(StackActions.popToTop())}>
      <ClosePrimary width={16} height={16} />
    </TouchableOpacity>
  );
};
export default HeaderCloseButton;
