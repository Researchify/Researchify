/**
 * Root App.js
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PublicationPage from './components/publications/PublicationPage';
import LandingPage from './components/landingPage/LandingPage';
import TeamPage from './components/team/TeamPage';
import './components/centred.css';
import Sidebar from './components/layout/Sidebar';
import './components/layout/Sidebar.css';
import AwardsPage from './components/awardsPage/AwardsPage';

const App = () => (
  <>
    <Container fluid>
      <Row>
        <Col xs={3} id="sidebar-wrapper" md={3} lg={3} xl={2}>
          <Sidebar />

        </Col>
        <Col className="page-content-wrapper" md={8} lg={4} xl={9}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/publication" component={PublicationPage} />
            <Route exact path="/team" component={TeamPage} />
            <Route exact path="/awardsPage" component={AwardsPage} />
          </Switch>
        </Col>
      </Row>

    </Container>

  </>

);

export default App;
