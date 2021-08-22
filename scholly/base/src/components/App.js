/**
 * Root App.js 
 */
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import HeaderWrapper from './layout/HeaderWrapper';
import { getRoutes } from './router/routes.js';
import './centred.css';

const App = () => {
  const routeItems = getRoutes().map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div>{View ? <View /> : null}</div>
      </Route>
    );
  });

  return (
    <Fragment>
      <HeaderWrapper />
      <Switch>
        {routeItems}
      </Switch>
    </Fragment>
  );
};

export default App;
