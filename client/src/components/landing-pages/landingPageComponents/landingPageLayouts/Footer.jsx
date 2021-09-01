import React from 'react';
import { theme } from '../../theme';
import CopyRight from '../../utils/Copyright';

const Footer = () => {
  const styles = {
    bg: {
      display: 'table',
      background: theme.dark,
      color: 'white',
      minHeight: '50px',
      height: '5vh',
      width: '100%',
      marginTop: '-5vh',
    },
    middle: {
      display: 'table-cell',
      verticalAlign: 'middle',
    },
  };

  return (
    <>
      <div style={styles.bg}>
        <div style={styles.middle}>
          <CopyRight invert />
        </div>
      </div>
    </>
  );
};

export default Footer;
