import React from 'react';
import { TEAM_INFO } from '../../../../global/data';

const MobileTopBar = ({ styles, title }) => {
  const topBarStyle = {
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: styles.mobiletopBarHeight,
    backgroundColor: '#DEE4E7',
    borderBottom: '1px solid #d8d8d8',
    padding: '0px 20px',
    boxSizing: 'border-box',
    zIndex: 3,
  };
  const { teamName, orgName } = TEAM_INFO;
  return (
    <div style={topBarStyle}>
      <span>{teamName}</span>
      <span style={{ fontWeight: 'bold' }}>{title}</span>
      <span>{orgName}</span>
    </div>
  );
};

export default MobileTopBar;
