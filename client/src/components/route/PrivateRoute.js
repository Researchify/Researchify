/**
 * This file export all the private route
 */
import { Switch, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// Pages
import Dashboard from '../dashboard/Dashboard';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import PublicationPage from '../publications/PublicationPage';
import TeamPage from '../teamPage/TeamPage';
import AchievementPage from '../achievements/AchievementPage';
import ClientHomeEditor from '../clientHomeEditor/ClientHomeEditor';

// Layout
import DashboardLayoutRoute from '../layouts/dashboardLayout/DashboardLayoutRoute';
import { logout } from '../../actions/auth';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const signInCookie = Cookies.get('isLogin') ? true : false;

  useEffect(() => {
    // after a user signIn, we need to keep track of the signInCookie as it might be removed after the tokens expire
    // if that the case, a sign out action need to be dispatched
    if (!signInCookie) {
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }, [dispatch, signInCookie]);

  return (
    <Switch>
      <DashboardLayoutRoute path="/dashboard" exact component={Dashboard} />
      <DashboardLayoutRoute
        path="/dashboard/profile"
        exact
        component={ProfileInfoEdit}
      />
      <DashboardLayoutRoute
        path="/publications"
        exact
        component={PublicationPage}
      />
      <DashboardLayoutRoute path="/team" exact component={TeamPage} />
      <DashboardLayoutRoute path="/achievement" exact component={AchievementPage} />
      <DashboardLayoutRoute
        path="/about-us"
        exact
        component={ClientHomeEditor}
      />
      {/*  If login, any other route not stated above will be redirect dashboard page */}
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default PrivateRoute;
