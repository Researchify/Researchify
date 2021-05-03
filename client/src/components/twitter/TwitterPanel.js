/**
 * The TwitterPanel component will function as a wrapper for our TwitterFeed and TwitterLink.
 */
import React from 'react';
import {useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TwitterFeed from "./TwitterFeed";
import TwitterLink from "./TwitterLink";

const TwitterPanel = () => {
    const linkedHandle = useSelector(state => state.team.twitterHandle);

    const randomData = [];  // todo: integrate with publications
    for (let i = 0; i < 50; i++) {
        randomData.push(i);
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={12} md={9} style={{backgroundColor: "cyan"}}>
                        <h3>Publications</h3>
                        {randomData.map((data, idx) => <div key={idx}>{data}</div>)}
                    </Col>
                    <Col xs={4} md={3}>
                        {
                            linkedHandle ? <TwitterFeed/> : <TwitterLink/>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default TwitterPanel;
