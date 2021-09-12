import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { TEAM_INFO } from '../../../../global/data';
import getRoutes from '../router/routes';

const Sidebar = () => {
  const headerData = getRoutes();
  const { orgName, teamName } = TEAM_INFO;
  return (
    <>

      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar me-auto"
        activeKey="/home"
      >
        <div className="landing-center-title">{teamName}</div>
        <div className="landing-title-org-name">{orgName}</div>
        {headerData.map(({ path, title }, index) => (
          <Nav.Link style={{ padding: 20 }} key={index} as={Link} to={path}>
            {title}
          </Nav.Link>
        ))}
      </Nav>

    </>

  );
};

export default Sidebar;
