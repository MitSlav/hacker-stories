import { memo } from 'react';
import Item from './Item';

const List = ({ list, onRemoveItem }) =>
  // console.log() on the left-hand side of the operator always evaluates to false, the right-hand side of the operator gets always executed
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
