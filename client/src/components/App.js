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
import Auth from './auth/Auth';
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

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
        <Switch>
          {/* public route */}
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />      

          {/* private route */}
          <Route render={props => <AuthenticationRouter {...props} />} />
         
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};


const AuthenticationRouter = (props) => {
  const { signIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(signIn)

  useEffect(() => {
    if(signIn){
      console.log("dispatch authorizaJWT")
      dispatch(authorizeJWT())
    }
  }, [dispatch]);

  if(signIn) {
    return (
      <BrowserRouter>
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
        </Switch>
      </BrowserRouter>
    );
  }
  return <Redirect to="/login" /> 
};


export default App;
