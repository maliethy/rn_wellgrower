import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoToButton from '~/Components/GoToButton';

const SoilData = () => {
  return (
    <View style={styles.container}>
      <Text>SoilData</Text>
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
export default SoilData;
