import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FindPassword = () => {
  return (
    <View style={styles.container}>
      <Text>FindPassword</Text>
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
export default FindPassword;
