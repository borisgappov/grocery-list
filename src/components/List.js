import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ConfirmDialog from './ConfirmDialog';
import ListItem from './ListItem';
import {
  remove,
  selectFilter,
  selectItems
} from './listSlice';


function List() {

  const items = useSelector(selectItems);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleConfirm = (confirmed, item) => {
    if (confirmed) dispatch(remove(item));
    setItemToRemove(null);
  }

  return (
    <>

      <ConfirmDialog title="Please confirm"
        message={`Do you really want to delete "${itemToRemove?.name}"?`}
        show={itemToRemove}
        confirm={(confirmed) => handleConfirm(confirmed, itemToRemove)} />

      <ListWrapper>
        {
          items
            .filter(e => filter === 0 || (filter === 1 ? e.ranOut : !e.ranOut))
            .map(e => <ListItem key={e.id} item={e} onRemove={setItemToRemove} />)
        }
      </ListWrapper>
    </>
  )
}

const ListWrapper = styled.div`
  overflow-y: auto;
  flex-grow: 1;

  ::-webkit-scrollbar {
    width: 12px;
    border-radius: 5px;
    
  }
  ::-webkit-scrollbar-track {
    background-color: #e6e6e6; 
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #bfbfbf; 
    border-radius: 5px;
  }
`

export default List;