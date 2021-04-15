import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InputAddress = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>약관동의</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default InputAddress;
