import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import HeaderData from './HeaderData';
import { TEAM_INFO } from '../../../../global/data';

const Sidebar = () => {
  const headerData = HeaderData();
  const { orgName, teamName } = TEAM_INFO;
  return (
    <>

      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar me-auto"
        activeKey="/home"
      >
        <div className="landing-center-title">{teamName}</div>
        <div className="landing-title-org-name">{orgName}</div>
        {headerData.map((val) => (
          <Nav.Link style={{ padding: 20 }} as={Link} to={val.link}>
            {val.title}
          </Nav.Link>
        ))}
      </Nav>

    </>

  );
};

export default Sidebar;
