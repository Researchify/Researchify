/**
 * This file exports layout of login/register page for Researchify.
 */

import React from 'react';
import { ThemeProvider } from '@material-ui/styles'; // eslint-disable-line import/no-extraneous-dependencies
import { createTheme } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import AuthHeader from './authComponents/AuthHeader';
import { theme as colour } from '../landing-pages/theme';
import Footer from '../landing-pages/landingPageComponents/landingPageLayouts/Footer';

const AuthLayout = ({ button, children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: colour.primary, // dull blue
      },
      secondary: {
        main: colour.secondary, // dull gold
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthHeader button={button} />
        <div style={{ minHeight: 'calc(100vh)' }}>
          {children}
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

// props validation
AuthLayout.propTypes = {
  button: PropTypes.element.isRequired,
  children: PropTypes.element,
};
AuthLayout.defaultProps = {
  children: undefined,
};

export default AuthLayout;
