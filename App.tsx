import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import color from './src/styles';
import NavController from './src/Components/NavController';
import useSWR from 'swr';
import fetcher from './src/Utils/fetcher';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import back_url from './src/config/config';

const App = () => {
  const { data: userData, mutate: mutateUser, error } = useSWR(`${back_url}/users`, fetcher, {
    dedupingInterval: 30 * 60 * 60 * 1000,
  });
  const { getItem: getAT, setItem: setAT } = useAsyncStorage('accessToken');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.PrimaryP900,
      text: color.PrimaryP900,
    },
  };
  const readAccessTokenFromStorage = async () => {
    const AT = await getAT();
    setAccessToken(AT);
  };
  useEffect(() => {
    if (userData) {
      readAccessTokenFromStorage();
      if (accessToken) setIsLoggedIn(true);
    }
  }, [userData]);
  return (
    <NavigationContainer theme={MyTheme}>
      <NavController isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

export default App;
