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
import { getTeamInfo } from '../actions/team';
import { useDispatch, useSelector } from 'react-redux';
const App = () => {
  const urls = {
    dashboard: '/dashboard',
    profile: '/dashboard/profile',
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamInfo('609f5ad827b1d48257c321d3')); // once we have implemented JWT (see below):
    // replace it with new `auth` action, pass jwt token, call api, authorise, get teamData, dispatch teamData to FETCH_TEAM_INFO.
  }, [dispatch]);

  const errorMessage = useSelector((state) => state.main.error);

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
                  <Route
                    path={`/publications`}
                    exact
                    component={PublicationPage}
                  />
                  <Route path={urls.dashboard} exact component={Dashboard} />
                  <Route
                    path={urls.profile}
                    exact
                    component={ProfileInfoEdit}
                  />
                  <Route path="/team" exact component={TeamPage} />
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
