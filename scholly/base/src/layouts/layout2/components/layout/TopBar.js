import React from 'react';
import { TEAM_INFO } from '../../../../global/data';

const TopBar = ({ styles }) => {
  const topBarStyle = {
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: styles.topBarHeight,
    backgroundColor: '#fff',
    borderBottom: '1px solid #d8d8d8',
    fontWeight: 'bold',
    padding: '0px 20px',
    boxSizing: 'border-box',
  };
  const { teamName, orgName } = TEAM_INFO;
  return (
    <div style={topBarStyle}>
      <span>{teamName}</span>
      <span>{orgName}</span>
    </div>
  );
};

export default TopBar;
