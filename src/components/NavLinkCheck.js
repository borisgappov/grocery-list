
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

export default function NavLinkCheck(props) {

  return (
    <Nav.Link onClick={()=>props.onFilterSelected && props.onFilterSelected(props.value)}>
      <NavLinkContent>
        <IconContainer>
          {props.checked && <FontAwesomeIcon icon={faCheck} />}
        </IconContainer>
        <div>{props.text}</div>
      </NavLinkContent>
    </Nav.Link>
  )
}

const NavLinkContent = styled.div`
  display: flex;
`
const IconContainer = styled.div`
  min-width: 25px;
  padding: 0px 5px;
`