import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography, Link } from '@material-ui/core';

const Copyright = ({ invert }) => {
  const colour = !!invert ? 'inherit' : 'textSecondary'; // eslint-disable-line no-extra-boolean-cast
  return (
    <>
      <Typography variant="body1" color={colour} align="center">
        Copyright &copy;
        <Link color="inherit" href="/">
          Researchify&nbsp;
        </Link>
        { new Date().getFullYear()}
        . All rights reserved.
      </Typography>
    </>
  );
};

//props validation
Copyright.propTypes = {
  invert: PropTypes.bool.isRequired,
};

export default Copyright;
