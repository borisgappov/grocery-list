import { useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { getRandomGroceryList } from '../shared/utils';
import { selectFilter, set, setFilter } from './listSlice';
import NavLinkCheck from './NavLinkCheck';


function NavBar() {
  const history = useNavigate();
  const location = useLocation();
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleFilterSelected = (val) => {
    dispatch(setFilter(val));
    handleClose();
  }

  const handleAdd = () => {
    handleClose();
    history('/entry');
  }

  const handleClear = () => {
    dispatch(set([]));
    handleClose();
  }

  const handleGenerate = () => {
    dispatch(set(getRandomGroceryList(25)));
    handleClose();
  }

  return (
    <StyledNavbar bg="light" expand={false}>
      <Container fluid>

        {location.pathname === '/' && <>
          <Navbar.Brand href="#">
            <img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" />
          </Navbar.Brand>
          <Navbar.Brand href="#">Grocery List</Navbar.Brand>

          <Button variant="light" onClick={handleShow} className="me-2">
            <span className="navbar-toggler-icon"></span>
          </Button>

          <Navbar.Offcanvas
            show={show} onHide={handleClose}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Grocery List Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <h6>Filter list</h6>
                <NavLinkCheck text={'Show all'} checked={filter === 0} value={0} onFilterSelected={handleFilterSelected} />
                <NavLinkCheck text={'Ran Out'} checked={filter === 1} value={1} onFilterSelected={handleFilterSelected} />
                <NavLinkCheck text={'Have'} checked={filter === 2} value={2} onFilterSelected={handleFilterSelected} />
                <NavDropdown.Divider />
                <Nav.Link onClick={handleGenerate}>Generate random items</Nav.Link>
                <Nav.Link onClick={handleClear}>Clear</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link onClick={handleAdd}>Add new item</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

        </>}

        {location.pathname.startsWith('/entry') && <>
          <Button variant="outline-primary" onClick={() => history('/')}>
            {'< Back'}
          </Button>
          <Navbar.Brand>Entry</Navbar.Brand>
          <div></div>
        </>}

      </Container>
    </StyledNavbar >
  )
}

const StyledNavbar = styled(Navbar)`
  border-radius: 5px;
`

export default NavBar;