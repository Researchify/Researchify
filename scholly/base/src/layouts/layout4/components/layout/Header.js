/**
 * This file exports header for Scholly (client) page.
 */
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TEAM_INFO } from '../../../../global/data';
import getRoutes from '../router/routes';

const Header = () => {
  const { orgName, teamName } = TEAM_INFO;
  const headerData = getRoutes();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        variant="primary"
        fixed="top"
      >
        <Container fluid>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {headerData.map(({ path, title }, index) => (
                <Nav.Link key={index} as={Link} to={path}>
                  {title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Brand as={Link} to="/">
            {teamName}
            {' '}
            @
            {orgName}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
