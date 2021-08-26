/**
 * This file exports header for Scholly (client) page.
 */
import React, { Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { TEAM_INFO } from '../../../../../../global/data';
import { Link } from 'react-router-dom';
import { getRoutes } from '../router/routes.js';

const Header = () => {
  const { orgName, teamName } = TEAM_INFO;
  const headerData = getRoutes();
  console.log(headerData);
  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {teamName} @ {orgName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {headerData.map(({path, title}, index) => {
                return (
                  <Nav.Link key={index} as={Link} to={path}>
                    {title}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
