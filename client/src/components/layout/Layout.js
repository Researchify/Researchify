import React, {Fragment} from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Container, Col, Row } from 'react-bootstrap';


const Layout = ({children, sidebarData, headerData}) =>{

    if (headerData == undefined){
        return(
            <Fragment>     
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
    else
    {
        return (
            <Fragment>
                <Header data={headerData}/>      
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
}
export default Layout;