/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamInfo } from '../actions/team';
import { ErrorToaster } from '../error/ErrorToaster';

// Pages
import Home from './home/Home';
import Auth from './auth/Auth';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import DeployPage from './deploy/DeployPage';

import Login from './auth/Login';
import Register from './auth/Register';
import PublicationPage from './publications/PublicationPage';
import EditorHome from './editor/EditorHome';
import TeamPage from './teamPage/TeamPage';

// Layout
import DashboardLayoutRoute from './layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from './layouts/editorLayout/EditorLayoutRoute';
import LandingPage from './landing-pages/LandingPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamInfo('609f5ad827b1d48257c321d3')); // once we have implemented JWT (see below):
    // replace it with new `auth` action, pass jwt token, call api, authorise, get teamData, dispatch teamData to FETCH_TEAM_INFO.
  }, [dispatch]);

  const errorMessage = useSelector((state) => state.main.error);

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <DashboardLayoutRoute path="/dashboard" exact component={Dashboard} />
          <DashboardLayoutRoute
            path="/dashboard/profile"
            exact
            component={ProfileInfoEdit}
          />
          <DashboardLayoutRoute
            path={`/publications`}
            exact
            component={PublicationPage}
          />
          <DashboardLayoutRoute path="/team" exact component={TeamPage} />
          <DashboardLayoutRoute path="/deploy" exact component={DeployPage} />
          <EditorLayoutRoute path="/editor" exact component={EditorHome} />
          <EditorLayoutRoute path="/editor/home" exact component={EditorHome} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
