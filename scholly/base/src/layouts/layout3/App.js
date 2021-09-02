/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicationPage from './components/publications/PublicationPage';
import LandingPage from './components/landingPage/LandingPage';
import Header from './components/layout/Header';
import TeamPage from './components/team/TeamPage';
import AwardsPage from './components/awardsPage/AwardsPage';
import './components/centred.css';

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/publication" component={PublicationPage} />
      <Route exact path="/team" component={TeamPage} />
      <Route exact path="/awardsPage" component={AwardsPage} />
    </Switch>
  </>
);

export default App;
