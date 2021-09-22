import React from 'react';

import { TEAM_INFO } from '../../../../global/data';

const DesktopTopBar = ({ styles }) => {
  const topBarStyle = {
    top: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: styles.desktoptopBarHeight,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    padding: '0px 20px',
    boxSizing: 'border-box',
    fontSize: 34,
    marginLeft: styles.sidebarWidth,
  };
  const { teamName, orgName } = TEAM_INFO;
  return (
    <div style={topBarStyle}>
      <span>{teamName}</span>
      <span>{orgName}</span>
    </div>
  );
};

export default DesktopTopBar;
