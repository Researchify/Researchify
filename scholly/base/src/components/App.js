/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Header from './layout/Header.js';
// import { getRoutes } from './router/routes.js';
// import { WEB_PAGES } from '../global/data';
import Header from './layout/Header';
import getRoutes from './router/routes';
import './centred.css';

const App = () => {
  console.log(WEB_PAGES)
  const routeItems = getRoutes().map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div>{View ? <View /> : null}</div>
      </Route>
    );
  });

  // useEffect(() => {
  //   document.title = WEBSITE_TITLE
  // }, [])

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
