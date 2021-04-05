import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export default () => (
  <Container>
    <ActivityIndicator color="#000" />
  </Container>
);
