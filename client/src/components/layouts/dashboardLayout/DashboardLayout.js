/**
 * This file exports the layout of Researchify Dashboard
 */

import React, { Fragment, useState } from 'react';
import Sidebar from '../layoutComponents/Sidebar';
import Header from '../layoutComponents/Header';
import { Container, Col, Row } from 'react-bootstrap';
import DashboardSidebarData from '../DashboardSidebarData';
import '../Layout.css';
import LogoutModal from '../../shared/LogoutModal';

const headerData = {
    title: "Researchify",
    dashboardURL: "/dashboard",
    profileURL: "/dashboard/profile"
}

const DashboardLayout = ({ children }) => {
    const [ logoutAlert, setLogoutAlert ] = useState(false)

    return (
        <Fragment>
            <Header data={headerData} />
            <Container fluid className="researchify-content-top-padding">
                <Row>
                    <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                        <Sidebar data={DashboardSidebarData({setLogoutAlert})} />
                    </Col>
                    <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
                        {children}
                    </Col>
                </Row>
            </Container>
        <LogoutModal logoutAlert={logoutAlert} setLogoutAlert={setLogoutAlert}/>
        </Fragment>
    );
};

export default DashboardLayout;
