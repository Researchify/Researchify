import React, { Fragment } from 'react';
import Sidebar from '../layoutComponents/Sidebar';
import { Container, Col, Row } from 'react-bootstrap';
import EditorSidebarData from '../../editor/EditorSidebarData';
import '../Layout.css';

const EditorLayout = ({ children }) => {

    return (
        <Fragment>
            <Container fluid>
                <Row>
                    <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                        <Sidebar data={EditorSidebarData} />
                    </Col>
                    <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
};

export default EditorLayout;
