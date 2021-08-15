import React from "react";
import { Box, useMediaQuery, makeStyles } from "@material-ui/core";
import { aboutDescription } from "../data/landing-page-labels";

const Description = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    crophover: {
      marginTop: "-5vh",
      marginBottom: "5vh",
    },
    layout: {
      width: "100%",
      minHeight: "30vh",
      padding: isMobile ? "1rem" : "2rem",
      borderRadius: "25px",
      boxShadow: "0px 12px 21px 0px rgba(0,0,0,0.2)",
    },
    golden: {
      color: "white",
      background:
        "linear-gradient(200deg, rgba(171,150,113,1) 0%, rgba(118,99,64,1) 80%)"
    },
    white: {
      background: "white",
      color: theme.palette.secondary.main,
    },
  }));

  const classes = useStyles();
  return (
    <div style={{ position: "relative", zIndex: 2 }} className="container">
      <Box
        className={` ${classes.crophover} ${classes.layout} ${classes.golden}`}
      >
        <Box
          fontSize={isMobile ? "2rem" : "h3.fontSize"}
          style={{ textAlign: "center" }}
        >
          Showcasing your research to the world.
        </Box>
        <Box
          fontSize={isMobile ? "1rem" : "1.2rem"}
          padding={4}
          lineHeight={1.8}
        >
          {aboutDescription.one}
        </Box>
      </Box>

      <Box
        alignItems={"flex-end"}
        className={`${classes.layout} ${classes.white}`}
      >
        <Box
          fontSize={isMobile ? "2rem" : "h3.fontSize"}
          style={{ textAlign: "center" }}
        >
          Easy to use.
        </Box>
        <Box
          fontSize={isMobile ? "1rem" : "1.2rem"}
          padding={4}
          lineHeight={1.8}
        >
          {aboutDescription.two}
        </Box>
      </Box>
    </div>
  );
};

export default Description;
