/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import getRoutes from '../router/routes';

const Sidebar = () => {
  const headerData = getRoutes();
  // const { orgName, teamName } = TEAM_INFO;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>

      <Nav.Link to="#" className="menu-bars">
        <FaIcons.FaBars onClick={showSidebar} />
      </Nav.Link>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Nav.Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Nav.Link>
          </li>
          {headerData.map(({ path, title }, index) => (
            <Nav.Link style={{ padding: 20 }} key={index} as={Link} to={path}>
              {title}
            </Nav.Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
