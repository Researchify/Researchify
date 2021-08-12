import React, { Fragment } from "react";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";

const LandingLayout = ({ url, children }) => {
  return (
    <Fragment>
      <LandingHeader linksAreShown={url === "/" ? true : false} />
      <div style={{ minHeight: "calc(100vh)" }}>{children}</div>
      <Footer />
    </Fragment>
  );
};

export default LandingLayout;
