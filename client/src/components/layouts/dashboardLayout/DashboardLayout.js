/**
 * This file exports the layout of Researchify Dashboard
 */

import React, { Fragment } from 'react';
import Sidebar from '../layoutComponents/Sidebar';
import Header from '../layoutComponents/Header';
import { Container, Col, Row } from 'react-bootstrap';
import DashboardSidebarData from '../DashboardSidebarData';
import '../Layout.css';

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
                        <Sidebar data={DashboardSidebarData()} />
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
