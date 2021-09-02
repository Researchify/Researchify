/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import { getRoutes } from './components/router/routes';
import './components/centred.css';

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
    <>
      <Header />
      <Switch>
        {routeItems}
      </Switch>
    </>
  );
};

export default App;
