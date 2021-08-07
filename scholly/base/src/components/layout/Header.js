import React, { Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { TEAM_INFO } from '../../global/data';
import './Header.css';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = () => {
  const { orgName, teamName } = TEAM_INFO;
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
          <Navbar.Brand>
            {teamName} @ {orgName}
          </Navbar.Brand>
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
