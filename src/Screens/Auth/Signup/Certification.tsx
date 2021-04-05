import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Certification = () => {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Certification;
