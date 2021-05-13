/**
 * The PublicationPage component redners TwitterFeed component and Publications component .
 */

 import React from 'react';
 import {useSelector} from "react-redux";
 import Container from "react-bootstrap/Container";
 import Row from "react-bootstrap/Row";
 import Col from "react-bootstrap/Col";
 
 import TwitterFeed from "../twitter/TwitterFeed";
 import TwitterLink from "../twitter/TwitterLink";
 import Publications from "./Publications"
 
 const PublicationPage = () => {
     const linkedHandle = useSelector(state => state.team.twitterHandle);
 
     return (
         <>
             <Container fluid>
                 <Row>
                     <Col xs={12} md={10}>
                         <Publications />
                     </Col>
                     <Col xs={4} md={2}>
                         {
                             linkedHandle ? <TwitterFeed/> : <TwitterLink/>
                         }
                     </Col>
                 </Row>
             </Container>
         </>
     );
 };
 
 export default PublicationPage;
 