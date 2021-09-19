/**
 * This file exports layout of login/register page for Researchify.
 */

import React from 'react';
import { ThemeProvider } from '@material-ui/styles'; // eslint-disable-line import/no-extraneous-dependencies
import { createTheme } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { theme as colour } from '../landing-pages/theme';

const AchievementsLayout = ({ button, children }) => {
// setting theme of the page
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
      <ThemeProvider theme={theme} button={button}>

        <div>
          {children}
        </div>
      </ThemeProvider>
    </>
  );
};

// props validation
AchievementsLayout.propTypes = {
  button: PropTypes.element.isRequired,
  children: PropTypes.element,
};
AchievementsLayout.defaultProps = {
  children: undefined,
};

export default AchievementsLayout;
