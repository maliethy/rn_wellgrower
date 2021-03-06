import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width:'100%',
  height:'100%',
  background-color: #ffffff;
`;

const Loader = () => (
  <Container>
    <ActivityIndicator color="#000" />
  </Container>
);
export default Loader;
