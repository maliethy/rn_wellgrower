import * as React from 'react';
import { ReactElement } from 'react';
import { FlatList } from 'react-native';

function VirtualizedView(props: any) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => <React.Fragment>{props.children}</React.Fragment>}
    />
  );
}
export default VirtualizedView;
