import * as React from 'react';
import VirtualizedView from '~/Components/VirtualizedView';
import { Container, Content, Accordion, Icon } from 'native-base';

import { View, Text } from 'react-native';
import dayjs from 'dayjs';
dayjs.locale('ko');

const dataArray = [
  {
    title: `${dayjs(new Date()).format('YYYY/MM/DD')} 베터랑 농부와의 대결`,
    content: 'Lorem ipsum dolor sit amet',
  },
  { title: 'Second Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Third Element', content: 'Lorem ipsum dolor sit amet' },
];

const Notice = () => {
  const _renderHeader = (item: { title: string }, expanded: boolean) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#A9DAD6',
        }}>
        <Text style={{ fontWeight: '600' }}> {item.title}</Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  };
  return (
    <VirtualizedView>
      <Container>
        <Content padder>
          <Accordion dataArray={dataArray} expanded={[0]} renderHeader={_renderHeader} />
        </Content>
      </Container>
    </VirtualizedView>
  );
};
export default Notice;
