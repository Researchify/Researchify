/**
 * Root App.js 
 */
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './layout/Header.js';
import { getRoutes } from './router/routes.js';
import './centred.css';
import './baseColours.css';
//import './darkColours.css';
import './lightColours.css';
//import './thirdTheme.css';
//import './fourthTheme.css';

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
      <Header />
      <Switch>
        {routeItems}
      </Switch>
    </Fragment>
  );
};

export default App;
