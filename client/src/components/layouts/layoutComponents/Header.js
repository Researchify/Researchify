import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav, Dropdown, Image, Row, Container,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import './Header.css';
import { PropTypes } from 'prop-types';
import defaultProfilePic from '../../../images/profilepic.jpg';
import HeaderProfileThumbnail from './HeaderProfileThumbnail';

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = ({ data, setLogoutAlert }) => {
  const { teamName, orgName, profilePic } = useSelector((state) => state.team);
  const [profileData, setProfileData] = useState({
    teamName, orgName, profilePic,
  });
  useEffect(() => {
    setProfileData({
      teamName, orgName, profilePic,
    });
  }, [orgName, teamName, profilePic]);

  /**
   * Updates profile image field when user uploads file
   */

  // If profilePic is undefined, set a default profile pic
  profileData.profilePic = profileData.profilePic ?? defaultProfilePic;
  const history = useHistory();
  return (
    <>
      <Navbar className="header" fixed="top">
        <Navbar.Brand href={data.dashboardURL}>
          <h2 style={{ color: '#414656' }}>
            RE
            <b style={{ color: '#56658a' }}>SEARCH</b>
            IFY
          </h2>
        </Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav>
          <Dropdown
            drop="down"
            alignRight
            className="header-link"
          >
            <Dropdown.Toggle
              as={HeaderProfileThumbnail}
              className="dashboard-dropdown-toggle"
              cursor="pointer"
            >
              {profileData.profilePic}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dashboard-dropdown-login-details" disabled>
                <Container fluid>
                  <Row className="flex-nowrap">
                    <Image
                      className="header-profile-img"
                      src={profileData.profilePic}
                      roundedCircle
                      height="45px"
                      width="45px"
                    />
                    <div className="dashboard-dropdown-login-details-info">
                      <strong style={{ fontSize: '110%' }}>
                        {profileData.teamName}
                      </strong>
                      <br />
                      {profileData.orgName}
                    </div>
                  </Row>
                </Container>

              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="dashboard-login-dropdown-item" eventKey="2" onClick={() => history.push('/dashboard/profile')} active={false}>
                <AiOutlineUser />
                {' '}
                Account
              </Dropdown.Item>
              <Dropdown.Item className="dashboard-login-dropdown-item" eventKey="3" onClick={() => setLogoutAlert(true)} active={false}>
                <AiOutlineLogout />
                {' '}
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        </Nav>
      </Navbar>
    </>
  );
};

// props validation
Header.propTypes = {
  data: PropTypes.object.isRequired,
  setLogoutAlert: PropTypes.func.isRequired,
};

export default Header;
