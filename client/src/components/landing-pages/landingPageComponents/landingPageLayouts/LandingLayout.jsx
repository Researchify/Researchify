/* eslint-disable */
import React from "react";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";

const LandingLayout = ({ url, children }) => {
  return (
    <>
      <LandingHeader linksAreShown={url === "/" ? true : false} /> 
      <div style={{ minHeight: "calc(100vh)" }}>{children}</div>
      <Footer />
    </>
  );
};

export default LandingLayout;
