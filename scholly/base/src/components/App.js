/**
 * Root App.js 
 */
import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './layout/Header.js';
import { getRoutes } from './router/routes.js';
import { WEBSITE_TITLE } from '../global/data';
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

  useEffect(() => {
    document.title = WEBSITE_TITLE
  }, [])

  return (
    <Fragment>
      <Header />
      <Switch>
        {routeItems}
      </Switch>
    </Fragment>
  );
};

export default App;
