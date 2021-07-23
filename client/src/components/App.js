/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorToaster } from '../error/ErrorToaster';

// Pages
import Home from './home/Home'; 
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import Login from './auth/Login';
import Register from './auth/Register';
import PublicationPage from './publications/PublicationPage';
import EditorHome from './editor/EditorHome';
import TeamPage from './teamPage/TeamPage';

// Layout
import DashboardLayoutRoute from './layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from './layouts/editorLayout/EditorLayoutRoute';

// Function
import { authorizeJWT } from '../actions/auth';

const App = () => {
  const errorMessage = useSelector((state) => state.main.error);
  const { signIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log("signIn", signIn)
  useEffect(() => {
    if(signIn){
      console.log("dispatch authorizaJWT")
      dispatch(authorizeJWT())
    }
  }, [dispatch, signIn]);

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
          { signIn ? <PrivateRoute /> : <PublicRoute /> }
      </BrowserRouter>
    </Fragment>
  );
};

const PublicRoute = () => {
  console.log("PublicRoute")
  return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} /> 
        <Redirect to="/"/>
      </Switch> 
  )
}

const PrivateRoute = () => {
  console.log('PrivateRoute')
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
        <Redirect to="/dashboard"/>
      </Switch>
  );
};


export default App;
