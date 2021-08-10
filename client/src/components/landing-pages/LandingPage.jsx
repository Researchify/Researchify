import React from "react";

import AboutUs from "./AboutUs";
import BigIntro from "./BigIntro";
import Description from "./Description";
import Features from "./Features";
import LandingLayout from "./LandingLayout";
import { createTheme } from "@material-ui/core/styles";
import { theme as colour } from "./theme";
import { ThemeProvider } from "@material-ui/styles";

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
