import React, { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  // dummy data passed in
  const props = {
    title: 'Some Research Team @ Monash',
  };

  return (
    <Fragment>
      <Navbar bg="light" variant="light" fixed="top">
        <Navbar.Brand>{props.title}</Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>Team</Nav.Link>
          <Nav.Link>Publications</Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );
};
export default Header;
