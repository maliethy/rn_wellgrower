import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarketingPolicy = () => {
  return (
    <View style={styles.container}>
      <Text>MarketingPolicy</Text>
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
export default MarketingPolicy;
