import React from "react";
import StyledTab from "./utils/StyledTabButton";

import {
  Box,
  Grid,
  Tabs,
  Typography,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import Divider from "./utils/Divider";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          color="secondary.main"
          fontSize={"1.2rem"}
          padding={4}
          lineHeight={1.5}
        >
          {children}
        </Box>
      )}
    </Typography>
  );
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const AboutUs = (props) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // should be refactored

  const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    container: {
      minHeight: "60vh",
      maxWidth: isMobile ? "90vw" : "70vw",
      margin: "5rem auto",
    }, // Elevation
    borderedCard: {
      borderRadius: "25px",
      padding: 20,
      minWidth: "300px",
      width: "60vw",
      maxWidth: "95vw",
      minHeight: "65vh",
      boxShadow: "0px 12px 20px 0px rgba(0,0,0,0.2)",
    },
  }));

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Grid container justify="center" direction="row">
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          md={3}
          xs={12}
        >
          <Grid item>
            <Box
              fontSize="h4.fontSize"
              fontWeight="bold"
              color="primary.main"
              textAlign="center"
            >
              OUR STORY
            </Box>
          </Grid>
          <Grid item style={{ maxWidth: "90vw" }}>
            <Divider invert={true} />

            <Tabs
              value={value}
              orientation={isMobile ? "horizontal" : "vertical"}
              variant="scrollable"
              onChange={handleChange}
              aria-label="wrapped label tabs about us"
            >
              {/**TODO: Can be refactored with loop */}
              <StyledTab value={0} label="Vision" {...a11yProps("one")} />
              <StyledTab value={1} label="Meet Our Team" {...a11yProps("two")} />
              <StyledTab value={2} label="Goals &amp; Objectives" {...a11yProps("two")} />
            </Tabs>
          </Grid>
        </Grid>

        {/**TODO: Can be refactored with loop */}
        <Grid item className={classes.borderedCard} md={9} xs={12}>
          <center>
          <TabPanel value={value} index={0}>
            <Box fontSize="h3.fontSize">Vision</Box>
            <Box color="black" fontSize="p.fontSize">
              <p>
              The Researchify Platform will remain a one-stop shop from inception to deployment of an 
              academic research website allowing non-tech-savvy researchers to significantly reduce 
              expenditures related to web development and the time before the website goes live. 
              </p>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box fontSize="h3.fontSize">Meet our Team</Box>
            <Box color="black" fontSize="p.fontSize">
              <p>
              17 undergraduate students collaborating under the supervision of Riordan to provide Researchers with a tool to create their own website.
              </p>
            </Box>
          </TabPanel>
          </center>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
