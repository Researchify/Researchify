/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './components/centred.css';
import Sidebar from './components/layout/Sidebar';
import './components/layout/Sidebar.css';
import { getRoutes } from './components/router/routes';

const App = () => {
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
