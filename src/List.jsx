import { memo } from 'react';
import Item from './Item';

const List = ({ list, onRemoveItem }) =>
  console.log('B:List') || (
    <ul>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );

export default memo(List);
