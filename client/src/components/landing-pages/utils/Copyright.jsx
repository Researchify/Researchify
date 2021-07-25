import React, { Fragment, useEffect } from "react";
import { Typography, Link } from "@material-ui/core";

const Copyright = ({ invert }) => {
  const colour = !!invert ? "inherit" : "textSecondary";
  return (
    <Fragment>
      <Typography variant="body1" color={colour} align="center">
        Copyright &copy;
        <Link color="inherit" href="/">
          DeltaCore
        </Link>
        {new Date().getFullYear()}
        {". All rights reserved."}
      </Typography>
    </Fragment>
  );
};

export default Copyright;
