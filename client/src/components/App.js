/**
 * Root component.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';

import Register from './auth/Register';
import Login from './auth/Login';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { Container, Col, Row } from 'react-bootstrap';
import './layout/Layout.css';
import { ErrorToaster } from '../error/ErrorToaster';

import TeamPage from './teamPage/TeamPage';
import PublicationPage from './publications/PublicationPage';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from '../route/PrivateRoute';
import { authorizeJWT } from '../actions/auth';

const App = () => {
  const urls = {
    dashboard: '/dashboard',
    profile: '/dashboard/profile',
  };

  const errorMessage = useSelector((state) => state.main.error);

  const dispatch = useDispatch()
  const { signIn } = useSelector(state => state.auth)

  console.log("render App!!!!!!!!!!!")
  console.log("signIn", signIn)

  useEffect(() => {
    if(signIn){
      dispatch(authorizeJWT())
    }
  }, [dispatch]);

  return (
    <>
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
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
