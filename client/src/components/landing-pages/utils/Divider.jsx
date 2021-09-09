import React from 'react';
import { Box } from '@material-ui/core';
import { PropTypes } from 'prop-types';

const Divider = ({ width, color }) => {
  const style = {
    minWidth: 100,
    width: !!width ? width : '5vw', // eslint-disable-line no-extra-boolean-cast
    height: 6,
    margin: '20px auto',
    background:
      color === 'blue'
        ? 'linear-gradient(20deg, rgba(65, 70, 86, 1) 0%, rgba(86, 101, 138, 1) 100%)'
        : 'linear-gradient(200deg, rgba(171,150,113,1) 0%, rgba(118,99,64,1) 80%)',
  };
  return <Box style={style} />;
};

//props validation
Divider.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};
Divider.defaultProps = {
  color: 'blue',
  width: '5vw',
};

export default Divider;
