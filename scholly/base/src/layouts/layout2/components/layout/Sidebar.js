/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = ({ styles, menuItems }) => {
  const location = useLocation();
  const sidebarStyle = {
    height: '100vh',
    width: styles.sidebarWidth,
    position: 'fixed',
    paddingTop: 90,
    backgroundColor: 'var(--researchify-color-quaternary)',
  };

  const menuItemStyle = {
    display: 'flex',
    justifyContent: styles.sidebarCollapsed ? 'center' : 'flex-start',
    alignItems: 'center',
    padding: `4px ${styles.sidebarCollapsed ? 0 : 10}px`,
  };

  const iconStyle = {
    fontSize: 26,
    marginRight: styles.sidebarCollapsed ? 0 : 10,
  };

  return (
    <div style={sidebarStyle}>
      {menuItems.map((item) => (
        <div style={menuItemStyle}>
          <Nav.Link
            style={{ color: location.pathname === item.path && 'var(--researchify-link-color' }}
            key={item.title}
            as={Link}
            to={item.path}
          >
            {styles.sidebarCollapsed && <span className="mr-3" style={iconStyle}>{item.icon}</span>}
            {!styles.sidebarCollapsed && item.title}
          </Nav.Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
