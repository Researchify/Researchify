import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsPeopleCircle } from 'react-icons/bs';
import { PropTypes } from 'prop-types';

import './Header.css';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = (props) => {
  const userName = useSelector(
    (state) => `${state.team?.teamName} @ ${state.team?.orgName}`,
  );
  // TODO: Remove hard-coded team id and publications id from the links
  return (
    <>
      <Navbar className="header" fixed="top">
        <Navbar.Brand>
          <Link className="header-brand" to={props.data.dashboardURL}>
            {props.data.title}
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav>
          <Link className="header-link" to="/dashboard/profile">
            <BsPeopleCircle className="header-profile-icon" />
            {' '}
            {userName}
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

// props validation
Header.propTypes = {
  data: PropTypes.isRequired,
};

export default Header;
