/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import { TEAM_INFO } from '../../../../global/data';

const Sidebar = ({ styles, menuItems }) => {
  const { teamName } = TEAM_INFO;
  const sidebarStyle = {
    height: '100vh',
    width: styles.sidebarWidth,
    position: 'fixed',
    backgroundColor: 'lightgrey',
    paddingTop: 40,
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

  const logoStyle = {
    textAlign: 'center',
    fontSize: 34,
    marginBottom: 60,
    fontWeight: 'bold',
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>{styles.sidebarCollapsed ? '' : teamName }</div>
      {menuItems.map((item) => (
        <div style={menuItemStyle}>
          <Link style={{ padding: 10 }} key={item.title} to={item.path}>
            <span className="mr-3" style={iconStyle}>{item.icon}</span>
            {!styles.sidebarCollapsed && item.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
