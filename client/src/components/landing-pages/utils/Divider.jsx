import React from "react";
import { Box } from "@material-ui/core";

const Divider = ({ width, color = "blue" }) => {
  const style = {
    minWidth: 100,
    width: !!width ? width : "5vw",
    height: 6,
    margin: "20px auto",
    background:
      color === "blue"
        ? "linear-gradient(20deg, rgba(65, 70, 86, 1) 0%, rgba(86, 101, 138, 1) 100%)"
        : "linear-gradient(200deg, rgba(171,150,113,1) 0%, rgba(118,99,64,1) 80%)",
  };
  return <Box style={style}></Box>;
};

export default Divider;
