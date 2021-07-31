import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TwitterFeed from "../twitter/TwitterFeed";
import Publications from "./Publications"
import {TEAM_TWITTER_HANDLE} from "../../global/data";


const PublicationPage = () => {
    const linkedHandle = TEAM_TWITTER_HANDLE;

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} md={10}>
                        <Publications/>
                    </Col>
                    <Col xs={4} md={2}>
                        {
                            linkedHandle ? <TwitterFeed linkedHandle={linkedHandle}/> : null
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PublicationPage;
 