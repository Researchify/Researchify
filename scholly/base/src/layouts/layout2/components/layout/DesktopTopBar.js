import React from 'react';

import { TEAM_INFO } from '../../../../global/data';

const DesktopTopBar = ({ styles }) => {
  const topBarStyle = {
    top: 0,
    width: '100%',
    height: styles.desktoptopBarHeight,
    fontWeight: 'bold',
    fontSize: 34,
    zIndex: 3,
  };
  const { teamName, orgName } = TEAM_INFO;
  return (
    <div style={topBarStyle}>
      <span>
        {teamName}
        {' '}
        @
      </span>
      <span>{orgName}</span>
    </div>
  );
};

export default DesktopTopBar;
