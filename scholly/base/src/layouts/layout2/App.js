/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { TEAM_INFO, TEAM_SITE_METADATA } from '../../global/data';
import Sidebar from './components/layout/Sidebar';
import './components/layout/Sidebar.css';
import getRoutes from './components/router/routes';
import './components/centered.css';
import '../../shared/css/style.css';
import '../../shared/css/baseColours.css';

const themeOption = TEAM_SITE_METADATA.template.theme;
if (themeOption === 'light') {
  import('../../shared/css/lightColours.css');
} else if (themeOption === 'dark') {
  import('../../shared/css/darkColours.css');
} else {
  // Fallback to light mode if unknown theme option is used
  import('../../shared/css/lightColours.css');
}

const App = () => {
  const { teamName } = TEAM_INFO;
  const routeItems = getRoutes().map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div>{View ? <View /> : null}</div>
      </Route>
    );
  });
  return (
    <>
      <Helmet>
        <title>{teamName}</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col xs={3} id="sidebar-wrapper" md={3} lg={3} xl={2}>
            <Sidebar />

          </Col>
          <Col className="page-content-wrapper" md={8} lg={4} xl={9}>
            <Switch>
              {routeItems}
            </Switch>
          </Col>
        </Row>

      </Container>

    </>
  );
};

export default App;
