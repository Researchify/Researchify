import React from "react"
import {Container,Row,Col,Card,Button} from "react-bootstrap"
import EditorHeader from './EditorHeader'
import EditorSideBarData from './EditorSideBarData'
import EditorHome from './EditorHome'
import Sidebar from '../layout/Sidebar';

const urls={
    dashboard: "/dashboard",
    profile: "/dashboard/profile"
}

const editor =()=>{return(
// Add routes to other editor pages just like in App component

    //Need to have header and sidebar wrapped in a fragmment for other editor pages to use
    <Container>

        
        <EditorHeader title={"Researchify"} urls={urls}/>
        <Sidebar data={{EditorSideBarData}} type={false} />
        <Row>
            <Col>
                Side
            </Col>
            <Col>
                <EditorHome />
            </Col>
            <Col>Images</Col>
        </Row>
        
    </Container>
)}


export default editor