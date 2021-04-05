import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoToButton from '~/Components/GoToButton';

const FarmingData = () => {
  return (
    <View style={styles.container}>
      <Text>FarmingData</Text>
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
export default FarmingData;
