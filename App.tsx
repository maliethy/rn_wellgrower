import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import NavController from '~/Components/NavController';
import useSWR from 'swr';
import fetcher from '~/Utils/fetcher';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LocalNotification from '@/utils/LocalNotification';

const back_url = 'http://192.168.0.20:3000/api';
const App = () => {
  const { data: userData, mutate: mutateUser, error } = useSWR(`${back_url}/users`, fetcher);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    console.log('app:', userData);
    if (userData) {
      const userToken = AsyncStorage.getItem('isLogin');
      console.log('userToken:', userToken);
      if (userToken) setIsLoggedIn(true);
    }
  }, [userData]);
  return (
    <NavigationContainer>
      <NavController isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

export default App;
