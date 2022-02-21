import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setStatus } from './listSlice';

function ListItem(props) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const markAs = (item, ranOut) => dispatch(setStatus({ item, ranOut }));

  return (
    <ListItemContainer>

      <ListItemText ranOut={props.item.ranOut} onClick={() => history('/entry/' + props.item.id)}>
        {props.item.name}
      </ListItemText>

      <CircleButton
        variant='outline-secondary'
        title={<FontAwesomeIcon icon={faEllipsisVertical} />}
        id={'item-dropdown-' + props.item.id}>

        {props.item.ranOut
          ? <Dropdown.Item onClick={() => markAs(props.item, false)}>Mark as 'Have'</Dropdown.Item>
          : <Dropdown.Item onClick={() => markAs(props.item, true)}>Mark as 'Ran Out'</Dropdown.Item>}
        <Dropdown.Item onClick={() => props.onRemove && props.onRemove(props.item)}>Remove</Dropdown.Item>
      </CircleButton>

    </ListItemContainer>
  )
}

const ListItemContainer = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  &:hover {
    background-color: rgba(0, 0, 0, 0.125);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const ListItemText = styled.div`
  flex-grow: 1;
  padding: 16px;
  color: ${props => props.ranOut ? '#bfbfbf' : 'black'}
`

const CircleButton = styled(DropdownButton)`
  button {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: none;
    margin: 8px 8px 8px 0;
    ::after {
      all:revert;
    }
  }  
`
export default ListItem;