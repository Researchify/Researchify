/**
 * This file exports header for Scholly (client) page.
 */
import React, { Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { TEAM_INFO } from '../../global/data';
import { Link } from 'react-router-dom';
import HeaderData from './HeaderData.js';

const Header = () => {
  const { orgName, teamName } = TEAM_INFO;
  const headerData = HeaderData();
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
          <Navbar.Brand>
            {teamName} @ {orgName}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" />
            <Nav>
              {headerData.map((val) => {
                return (
                  <Nav.Link as={Link} to={val.link}>
                    {val.title}
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
