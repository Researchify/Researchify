import React, { Fragment } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Container, Col, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import SidebarData from './SidebarData';
import EditorSideBarData from '../editor/EditorSideBarData'

const headerData = {
    title: "Researchify",
    dashboardURL: "/dashboard",
    profileURL: "/dashboard/profile"
}

const DashboardLayout = ({ children }) => {


    return (
        <Fragment>
            <Header data={headerData} />
            <Container fluid>
                <Row>
                    <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                        <Sidebar data={SidebarData} />
                    </Col>
                    <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

const DashboardLayoutRoute = ({ component: Component, ...rest}) => {
    //get 'component' and renamed to 'Component', any other 'props' renamed to 'rest'
    return (
        <Route 
            {...rest} 
            render={routeProps => (
                <DashboardLayout>
                    <Component {...routeProps} />
                </DashboardLayout>
            )}
        />
    );
};


export default DashboardLayoutRoute;