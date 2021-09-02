/**
 * This file exports header for Scholly (client) page.
 */
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TEAM_INFO } from '../../../../global/data';
import HeaderData from './HeaderData';

const Header = () => {
  const { orgName, teamName } = TEAM_INFO;
  const headerData = HeaderData();
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
              {headerData.map((val) => (
                <Nav.Link as={Link} to={val.link}>
                  {val.title}
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
