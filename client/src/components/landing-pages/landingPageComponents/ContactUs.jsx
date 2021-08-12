import React, { Fragment } from "react";
import { theme as colour } from "../theme";
import { Grid, Button, Box } from "@material-ui/core";
import ContactForm from "./data/ContactForm";

const ContactUs = () => {
  const styles = {
    bg: {
      background: "rgba(42, 43, 50, 1)",
      color: "white",
      marginBottom: "5vh",
      minHeight: "30vh",
      padding: "2rem",
      position: "relative",
      width: "100%",
    },
    borderColor: {
      borderRadius: "25px",
      border: `2px solid ${colour.secondary}`,
    },
    layout: {
      margin: "0 auto",
      minWidth: 300,
      minHeight: "30vh",
      width: "35vw",
      padding: "5rem",
      boxShadow: "0px 12px 21px 0px rgba(0,0,0,0.2)",
    },
  };

  return (
    <Fragment>
      <footer style={styles.bg}>
        <div style={{ ...styles.layout, ...styles.borderColor }}>
          <Grid
            container
            justify={"center"}
            direction={"row"}
            alignContent={"flex-start"}
            spacing={3}
          >
            <Grid item>
              <Box fontSize={"h3.fontSize"} color={"secondary.main"}>
                CONTACT US!
              </Box>
            </Grid>
            <Grid item>
              <Box
                fontSize={"1.2rem"}
                textAlign={"center"}
                color={"secondary.main"}
              >
                If you have any queries, feedback, or questions, please feel
                free to fill in the form below!
              </Box>
            </Grid>

            <Grid item style={{ minWidth: "25vw" }}>
              <ContactForm />
            </Grid>
          </Grid>
        </div>
      </footer>
    </Fragment>
  );
};

export default ContactUs;
