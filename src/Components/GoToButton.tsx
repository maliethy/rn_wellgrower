import React, { ReactElement } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function GoToButton({ screenName }: { screenName: string }): ReactElement {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
        <Text style={{ backgroundColor: 'skyblue', padding: 10 }}>{screenName}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default GoToButton;
