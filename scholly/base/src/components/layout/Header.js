import React, { Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  // dummy data passed in
  const props = {
    title: 'Some Research Team @ Monash',
  };

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand>{props.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Team</Nav.Link>
              <Nav.Link>Publications</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};
export default Header;
