import React, { ReactElement, useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import BasicText from './BasicText';
import { useNavigation } from '@react-navigation/native';
import color from '~/styles';

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
      : navigation.navigate('Certification');
    setModalVisible(false);
  }, [navigation]);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <BasicText bold={true} size={16} otherStyle={styles.modalTitle} text={title} />
            <BasicText
              color={color.GrayscaleSecondaryText}
              size={14}
              text={text}
              otherStyle={styles.modalText}
            />
          </View>

          <Pressable style={styles.buttonLayout} onPress={onNavigation}>
            <BasicText
              otherStyle={styles.cancelTextStyle}
              color={'#fff'}
              size={16}
              text={buttonText}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
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
    padding: 23,
  },
  buttonLayout: {
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.PrimaryP900,
  },

  cancelTextStyle: {
    fontSize: 20,
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 19,
  },
  modalText: {
    marginBottom: 19,
    textAlign: 'center',
  },

  buttonText: {
    fontSize: 20,
  },
});

export default BasicModal;