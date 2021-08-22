/**
 * This file exports header for Scholly (client) page.
 */
import React, { Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {
  console.log(props);
  const { orgName, teamName } = props.teamMetaData;
  const colors = props.colors;

  let bg = "light";
  let variant = "light"
  if (colors.primary === "black") {
    bg = "dark";
    variant = "dark";
  }

  const headerData = props.routes;

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="md"
        bg={bg}
        variant={variant}
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
