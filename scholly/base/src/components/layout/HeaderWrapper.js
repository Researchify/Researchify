/**
 * This file exports header for Scholly (client) page.
 */
import React from 'react';
import { TEAM_INFO } from '../../global/data';
import { getRoutes } from '../router/routes.js';
import Header from './Header';

const Headers = {
    1: Header,
}

const HeaderWrapper = () => {

  const colors = {
    "primary": "black",
    "secondary": "#00446"
  };

  const headerData = getRoutes();
  const Component = Headers[1];

  return (
    <Component teamMetaData={TEAM_INFO} colors={colors} routes={headerData}></Component>
  );
};

export default HeaderWrapper;
