/**
 * Root App.js 
 */
import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicationPage from './publications/PublicationPage.js';
import LandingPage from './landingPage/LandingPage.js';
import TeamPage from './team/TeamPage.js';
import {Container, Row, Col } from "react-bootstrap";
import './centred.css';
import Sidebar from "./layout/Sidebar";
import "./layout/Sidebar.css"

const App = () => {
  return (
    <Fragment>
        <Container fluid>
            <Row>
                <Col xs={3} id="sidebar-wrapper"  md={3} lg={3} xl={2}>
                    <Sidebar />

                </Col>
                <Col className="page-content-wrapper" md={8} lg={4} xl={9}>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/publication" component={PublicationPage} />
                        <Route exact path="/team" component={TeamPage} />
                    </Switch>
                </Col>
            </Row>


        </Container>

    </Fragment>

  );
};

export default App;
