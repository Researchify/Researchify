import React, { Fragment } from "react";
import { theme } from "./theme";
import CopyRight from "./utils/Copyright";

const Footer = () => {
  const styles = {
    bg: {
      display: "table",
      background: theme.dark,
      color: "white",
      minHeight: "50px",
      height: "5vh",
      width: "100%",
      marginTop: "-5vh",
    },
    middle: {
      display: "table-cell",
      verticalAlign: "middle",
    },
  };

  return (
    <Fragment>
      <div style={styles.bg}>
        <div style={styles.middle}>
          <CopyRight invert={true} />
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
