import React, { Fragment } from 'react';
import Sidebar from '../layoutComponents/Sidebar';
import Header from '../layoutComponents/Header';
import { Container, Col, Row } from 'react-bootstrap';
import SidebarData from '../DashboardSidebarData';

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

export default DashboardLayout;
