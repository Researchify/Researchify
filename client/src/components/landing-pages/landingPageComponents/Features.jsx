import '../css/features.css';
import {
  Box, Grid, Paper, Button, useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { PropTypes } from 'prop-types';
import Divider from '../utils/Divider';
import { featuresData } from '../data/landing-page-labels';

// icons

const FlippingCard = ({
  logo, title, description, classes,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Grid key={title} item>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Paper className={classes.paper}>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              {' '}
              {logo}
            </Box>
            <Box fontSize="h5.fontSize" margin={2} color="secondary.main">
              {title}
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsFlipped(true)}
            >
              Info
            </Button>
          </Box>
        </Paper>
        <Paper
          className={classes.paper}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <Grid container direction="column">
            <Box
              display="flex"
              justifyContent="flex-end"
              fontWeight="bold"
              color="secondary.main"
              style={{ margin: '-15px -10px 0 0', cursor: 'pointer' }}
              onClick={() => setIsFlipped(false)}
            >
              X
            </Box>
            <Box>{description}</Box>
          </Grid>
        </Paper>
      </ReactCardFlip>
    </Grid>
  );
};

const Features = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: isMobile ? 100 : 250,
      width: isMobile ? 100 : 250,
      padding: '2rem',
    },
    container: {
      width: isMobile ? 'inherit' : '80vw',
      margin: '0 auto',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div className="slanted-bg">
      <Grid
        container
        direction="column"
        spacing={3}
        className={classes.container}
      >
        <Grid item xs={12}>
          <Box fontSize="h3.fontSize" color="secondary.main" textAlign="center">
            FEATURES
          </Box>
          <Divider color="golden" />
          <Box
            textAlign="center"
            fontSize="h5.fontSize"
            color="white"
            fontWeight="100"
          >
            Here are our amazing features:
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center" spacing={isMobile ? 5 : 10}>
            {featuresData.map(({ logo, title, description }, index) => (
              <FlippingCard
                logo={logo}
                title={title}
                description={description}
                classes={classes}
                key={index}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

//props validation
FlippingCard.propTypes = {
  logo: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default Features;
