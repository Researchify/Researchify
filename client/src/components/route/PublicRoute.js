/**
 * This file export all the public route
 */

import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import LandingPage from '../landing-pages/LandingPage';
import LoginPage from '../auth/LoginPage';
import RegistrationPage from '../auth/RegistrationPage';

const PublicRoute = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/register" exact component={RegistrationPage} />
    <Route path="/login" exact component={LoginPage} />
    {/*  If not login, any other route not stated above will be redirect home page */}
    <Redirect to="/" />
  </Switch>
);

export default PublicRoute;
