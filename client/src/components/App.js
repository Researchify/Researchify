/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { fetchUserAction } from '../actions/users';
import { useDispatch, useSelector } from 'react-redux';

/** Pages **/
import Home from './home/Home';
import Auth from './auth/Auth';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';

import Login from './auth/Login';
import Register from './auth/Register';

import PublicationPage from './publications/PublicationPage';
import EditorHome from './editor/EditorHome';
import TeamPage from './teamPage/TeamPage';

/** Layout **/
import DashboardLayoutRoute from './layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from './layouts/editorLayout/EditorLayoutRoute';

const App = () => {
  const teamId = useSelector((state) => state.user.teamId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
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
            path={`/publications/team/${teamId}`}
            exact
            component={PublicationPage}
          />
          <DashboardLayoutRoute path="/team" exact component={TeamPage} />

          <EditorLayoutRoute path="/editor" exact component={EditorHome} />
          <EditorLayoutRoute path="/editor/home" exact component={EditorHome} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
