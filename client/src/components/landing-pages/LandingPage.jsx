import React from "react";

import { ThemeProvider } from '@material-ui/styles'; // eslint-disable-line import/no-extraneous-dependencies
import { createTheme } from '@material-ui/core/styles';

import AboutUs from "./landingPageComponents/AboutUs";
import BigIntro from "./landingPageComponents/BigIntro";
import Description from "./landingPageComponents/Description";
import Features from "./landingPageComponents/Features";
import LandingLayout from "./landingPageComponents/landingPageLayouts/LandingLayout";
import { theme as colour } from "./theme";

/**
 * Landing page component gets called by App.js
 * @param {*} route of component
 * @returns 
 */
const LandingPage = ({ match }) => {
  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: colour.primary,
      },
      secondary: {
        // This is green.A700 as hex.
        main: colour.secondary,
      },
      typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 12,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <LandingLayout url={match.url}>
        <BigIntro />
        <section id="about">
          <Description />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="company">
          <AboutUs />
        </section>
      
      </LandingLayout>
    </ThemeProvider>
  );
};

export default LandingPage;
