import React from 'react';

import { TEAM_INFO } from '../../../../global/data';

const DesktopTopBar = ({ styles, title }) => {
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
    zIndex: 5,
  };
  const { teamName, orgName } = TEAM_INFO;
  return (
    <div style={topBarStyle}>
      <span>{teamName}</span>
      <span>{orgName}</span>
      <span style={{ fontSize: 28, fontWeight: 'normal' }}> - </span>
      <span style={{ fontSize: 28, fontWeight: 'normal' }}>{title}</span>
    </div>
  );
};

export default DesktopTopBar;
