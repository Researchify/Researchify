import React from 'react';
import PublicationPage from './publications/PublicationPage';
import TeamPage from './teampage/TeamPage'
import HomePage from './home/HomePage';
import Sidebar from './layout/Sidebar';
import SidebarData from './layout/SidebarData';
import { Switch, Route } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

const App = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                        <Sidebar data={SidebarData()} />
                    </Col>
                    <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
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
