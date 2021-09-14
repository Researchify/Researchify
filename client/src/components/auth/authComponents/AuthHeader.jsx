/**
 * This file export header component for login page and register page.
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Navbar,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import { theme } from '../../landing-pages/theme';

const AuthHeader = ({ button }) => {
  const styles = {
    shadow: {
      backgroundColor: 'white',
      transition: 'top 0.5s',
      boxShadow: '0px 14px 25px -20px rgba(0,0,0,0.1)',
    },
  };

  return (
    <>
      <Navbar id="navbar" light expand="md" style={styles.shadow} sticky="top">
        <NavbarBrand href="/">
          <h2 style={{ color: theme.dark }}>
            RE
            <b style={{ color: theme.primary }}>SEARCH</b>
            IFY
          </h2>
        </NavbarBrand>
        <Nav className="mr-auto" navbar />
        <Nav>
          {button}
        </Nav>
      </Navbar>
    </>
  );
};

// props validation
AuthHeader.propTypes = {
  button: PropTypes.element.isRequired,
};

export default AuthHeader;
