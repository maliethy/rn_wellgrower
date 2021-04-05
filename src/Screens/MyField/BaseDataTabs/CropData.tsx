import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoToButton from '~/Components/GoToButton';

const CropData = () => {
  return (
    <View style={styles.container}>
      <Text>CropData</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CropData;
