import React, {Fragment} from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import { Container, Col, Row } from 'react-bootstrap';


const Layout = ({children, sidebarData, urls}) =>{
    return (
        <Fragment>
            <Header title={"Researchify"} urls={urls}/>      
            <Container fluid>
                <Row>
                <Col className="sidebar-wrapper" md={2} lg={2} xl={1}>
                    <Sidebar data={sidebarData} />
                </Col>
                <Col className="page-content-wrapper" md={10} lg={10} xl={11}>
                    {children}
                </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default Layout;