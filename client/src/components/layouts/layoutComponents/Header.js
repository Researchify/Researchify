import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

import './Header.css';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = ({ data }) => {
  const {
    teamName, orgName, profilePic,
  } = useSelector(
    (state) => state.team,
  );

  const userName = `${teamName} @ ${orgName}`;

  return (
    <>
      <Navbar className="header" fixed="top">
        <Navbar.Brand>
          <Link className="header-brand" to={data.dashboardURL}>
            {data.title}
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav>
          <Link className="header-link" to="/dashboard/profile">
            <Image
              className="header-profile-img"
              src={profilePic}
              roundedCircle
              height="45px"
              width="45px"
            />
            {userName}
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

// props validation
Header.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Header;
