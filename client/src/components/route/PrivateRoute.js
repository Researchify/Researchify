/**
 * Root component.
 */
import { Switch, Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
// Pages 
import Dashboard from '../dashboard/Dashboard';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import PublicationPage from '../publications/PublicationPage';
import EditorHome from '../editor/EditorHome';
import TeamPage from '../teamPage/TeamPage';

// Layout
import DashboardLayoutRoute from '../layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from '../layouts/editorLayout/EditorLayoutRoute';
import { AUTH_SIGN_OUT } from '../../actions/types';

const PrivateRoute = () => {
  const dispatch = useDispatch()
  const signInCookie = Cookies.get('isLogin') ? true : false;

  useEffect(() => {
    // after a user signIn, we need to keep track of the signInCookie as it might be removed after the tokens expire
    // if that the case, a sign out action need to be dispatched 
    if(!signInCookie){
      setTimeout(() => {
        dispatch({
          type: AUTH_SIGN_OUT
        })
      }, 3000)
    }
  }, [dispatch, signInCookie])

    return (
        <Switch>
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
          <EditorLayoutRoute path="/editor" exact component={EditorHome} />
          <EditorLayoutRoute path="/editor/home" exact component={EditorHome} />
          {/*  If login, any other route not stated above will be redirect dashbroad page */}
          <Redirect to="/dashboard"/> 
        </Switch> 
    );
  };

export default PrivateRoute