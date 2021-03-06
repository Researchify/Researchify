/**
 * This file exports the layout of Researchify Dashboard
 */

import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Sidebar from '../layoutComponents/Sidebar';
import Header from '../layoutComponents/Header';
import DashboardSidebarData from '../DashboardSidebarData';
import '../Layout.css';
import LogoutModal from '../../shared/LogoutModal';

const headerData = {
  title: 'Researchify',
  dashboardURL: '/dashboard',
  profileURL: '/dashboard/profile',
};

const DashboardLayout = ({ children }) => {
  const [logoutAlert, setLogoutAlert] = useState(false);

  return (
    <>
      <Header data={headerData} setLogoutAlert={setLogoutAlert} />
      <Container fluid className="researchify-content-top-padding">
        <Row className="content-under-header">
          <Col className="sidebar-wrapper">
            <Sidebar data={DashboardSidebarData()} />
          </Col>
          <Col className="page-content-wrapper">
            {children}
          </Col>
        </Row>
      </Container>
      <LogoutModal logoutAlert={logoutAlert} setLogoutAlert={setLogoutAlert} />
    </>
  );
};

// props validation
DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DashboardLayout;
