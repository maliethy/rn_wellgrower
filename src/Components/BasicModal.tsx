import React, { ReactElement, useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import BasicText from './BasicText';
import { useNavigation } from '@react-navigation/native';
import { color } from '~/styles';
import { ScaledSheet } from 'react-native-size-matters';

type modalProps = {
  title: string;
  text: string;
  buttonText: string;
  modalVisible: boolean;
  setModalVisible: (prop: boolean) => void;
};
const BasicModal = ({
  title,
  text,
  buttonText,
  modalVisible,
  setModalVisible,
}: modalProps): ReactElement => {
  const navigation = useNavigation();
  const onNavigation = useCallback(() => {
    buttonText === '다시시도'
      ? () => navigation.navigate('Login')
      : buttonText === '계정 잠금 해제'
      ? () => navigation.navigate('Certification')
      : buttonText === '로그인 하기' && (() => navigation.navigate('Login'));
    setModalVisible(false);
  }, [navigation]);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <BasicText
              bold={true}
              size={'16@ms'}
              otherStyle={styles.modalTitle}
              text={title}
              color={color.GrayscaleSecondaryText}
            />
            <BasicText
              color={color.GrayscaleSecondaryText}
              size={'14@ms'}
              text={text}
              otherStyle={styles.modalText}
            />
          </View>

          <Pressable style={styles.buttonLayout} onPress={onNavigation}>
            <BasicText
              otherStyle={styles.cancelTextStyle}
              color={color.GrayscaleWash}
              size={'16@ms'}
              text={buttonText}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.GrayscaleSecondaryText,
  },
  modalView: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  textView: {
    padding: '23@ms',
  },
  buttonLayout: {
    padding: '14@ms',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.PrimaryP900,
  },
  cancelTextStyle: {
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: '19@ms',
    lineHeight: '20@ms',
    letterSpacing: -0.6,
  },
  modalText: {
    marginBottom: '19@ms',
    textAlign: 'center',
    lineHeight: '18@ms',
    letterSpacing: -0.6,
  },

  buttonText: {
    lineHeight: '20@ms',
    letterSpacing: -0.6,
  },
});

export default BasicModal;
