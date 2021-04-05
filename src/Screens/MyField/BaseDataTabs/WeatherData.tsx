import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoToButton from '~/Components/GoToButton';

const WeatherData = () => {
  return (
    <View style={styles.container}>
      <Text>WeatherData</Text>
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
export default WeatherData;
