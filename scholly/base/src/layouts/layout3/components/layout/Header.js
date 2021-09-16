/**
 * This file exports header for Scholly (client) page.
 */
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TEAM_INFO } from '../../../../global/data';
import getRoutes from '../router/routes';

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const { twitterHandle, orgName, teamName } = TEAM_INFO;
  const headerData = getRoutes();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {teamName}
            {' '}
            @
            {orgName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {headerData.map(({ path, title }, index) => (
                <Nav.Link key={index} as={Link} to={path}>
                  {title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
