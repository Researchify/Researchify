/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './components/layout/Header';
import getRoutes from './components/router/routes';
import { TEAM_INFO } from '../../global/data';
import './components/centered.css';
import '../../shared/css/style.css';
import '../../shared/css/baseColours.css';

const themeOption = '1';
if (themeOption === '1') {
  import('../../shared/css/lightColours.css');
} else if (themeOption === '2') {
  import('../../shared/css/darkColours.css');
} else {
  // Fallback to light mode if unkown theme option is used
  import('../../shared/css/lightColours.css');
}

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
