/**
 * File exports the footer for auth pages.
 * Footer is set to fixed position (will stick at the bottom of the screen when you scroll)
 */
import React from 'react';
import { theme } from '../../landing-pages/theme';
import Copyright from '../../landing-pages/utils/Copyright';

const AuthFooter = () => {
  const styles = {
    bg: {
      display: 'table',
      background: theme.dark,
      color: 'white',
      minHeight: '50px',
      height: '5vh',
      width: '100%',
      marginTop: '-5vh',
      position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 10,
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
          <Copyright invert />
        </div>
      </div>
    </>
  );
};

export default AuthFooter;
