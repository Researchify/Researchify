/**
 * This file export all the public route
 */

import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import LandingPage from '../landing-pages/LandingPage';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';

const PublicRoute = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/register" exact component={RegisterPage} />
    <Route path="/login" exact component={LoginPage} />
    {/*  If not login, any other route not stated above will be redirect home page */}
    <Redirect to="/" />
  </Switch>
);

export default PublicRoute;
