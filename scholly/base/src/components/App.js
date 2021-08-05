import React from 'react';
import PublicationPage from './publications/PublicationPage';
import TeamPage from './teampage/TeamPage'
import HomePage from './home/HomePage';
import Sidebar from './layout/Sidebar';
import SidebarData from './layout/SidebarData';
import Header from './layout/Header';
import { Switch, Route } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

const App = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <Col className="sidebar-wrapper" sm={4} md={2}>
                        <Sidebar data={SidebarData()} />
                    </Col>
                    <Col className="page-content-wrapper" sm={8} md={10}>
                        <Switch>
                            <Route exact path ='/' component = {HomePage} />
                            <Route exact path="/publication" component={PublicationPage} />
                            <Route exact path="/team" component={TeamPage} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;
