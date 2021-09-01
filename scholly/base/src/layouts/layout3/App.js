/**
 * Root App.js
 */
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicationPage from './components/publications/PublicationPage.js';
import LandingPage from './components/landingPage/LandingPage.js';
import Header from './components/layout/Header.js';
import TeamPage from './components/team/TeamPage.js';
import AwardsPage from './components/awardsPage/AwardsPage.js';
import './components/centred.css';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/publication" component={PublicationPage} />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/awardsPage" component={AwardsPage} />
      </Switch>
    </Fragment>
  );
};

export default App;
