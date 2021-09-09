/**
 * This file exports the Route that is embeded with Researchify Dashboard Layout
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import DashboardLayout from './DashboardLayout';

const DashboardLayoutRoute = ({ component: Component, ...rest }) => (
// get 'component' and renamed to 'Component', any other 'props' renamed to 'rest'
  <Route
    {...rest}
    render={(routeProps) => (
      <DashboardLayout>
        <Component {...routeProps} />
      </DashboardLayout>
    )}
  />
);

// props validation
DashboardLayoutRoute.propTypes = {
  component: PropTypes.isRequired,
};

export default DashboardLayoutRoute;
