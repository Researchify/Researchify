import React, { Fragment } from 'react';
import Sidebar from '../layoutComponents/Sidebar';
import { Container, Col, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import EditorSidebarData from '../../editor/EditorSidebarData';


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

const EditorLayoutRoute = ({ component: Component, ...rest }) => {
    //get 'component' and renamed to 'Component', any other 'props' renamed to 'rest'
    return (
        <Route
            {...rest}
            render={routeProps => (
                <EditorLayout>
                    <Component {...routeProps} />
                </EditorLayout>
            )}
        />
    );
};


export default EditorLayoutRoute;