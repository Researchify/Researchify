/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TEAM_INFO } from '../global/data';
import Header from './layout/Header';
import getRoutes from './router/routes';
import './centred.css';

const App = () => {
  const { teamName } = TEAM_INFO;
  const routeItems = getRoutes().map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div>{View ? <View /> : null}</div>
      </Route>
    );
  });

  return (
    <>
      <Helmet>
        <title>{teamName}</title>
      </Helmet>
      <Header />
      <Switch>
        {routeItems}
      </Switch>
    </>
  );
};

export default App;
