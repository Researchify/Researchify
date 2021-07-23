/**
 * Root component.
 */
import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorToaster } from '../error/ErrorToaster';
import PrivateRoute from '../route/PrivateRoute';

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
  const urls = {
    dashboard: '/dashboard',
    profile: '/dashboard/profile',
  };
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.main.error);
  const { signIn } = useSelector(state => state.auth);

  useEffect(() => {
    if(signIn){
      dispatch(authorizeJWT())
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Fragment>
            <Header title={'Researchify'} urls={urls} />
            <Container fluid>
              <Row>
                <Col className="sidebar-wrapper" md={1} lg={1}>
                  <Sidebar />
                </Col>
                <Col className="page-content-wrapper" md={10} lg={10}>
                  <PrivateRoute
                    path={`/publications`}
                    exact
                    signIn = {signIn}
                    component={PublicationPage}
                    authenticationPath='/login'
                  />
                  <PrivateRoute 
                    path={urls.dashboard} 
                    exact 
                    signIn = {signIn}
                    component={Dashboard} 
                    authenticationPath='/login'
                  />
                  <Route
                    path={urls.profile}
                    exact
                    component={ProfileInfoEdit}
                  />
                  <PrivateRoute 
                    path="/team" 
                    exact 
                    signIn = {signIn}
                    component={TeamPage} 
                    authenticationPath='/login'
                  />
                </Col>
              </Row>
            </Container>
          </Fragment>
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
    </Fragment>
  );
};
export default App;
