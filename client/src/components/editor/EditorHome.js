import React from "react"
import {Container,Row,Col,Card,Button} from "react-bootstrap"

const handleClick = () => {

    return(
        <Card>
                <Card.Body>Workaye</Card.Body>
        </Card>
    )

}
const EditorHome=()=>{
    return(    
        <Container>
            <Row md={2} lg={2} > 
                <Col md={2} lg={2} xl={1}>
                    <Card>
                        <Card.Body><Button className="buttonStyler" onClick={handleClick}>+</Button></Card.Body>
                    </Card>
                </Col>
                <Col md={220} lg={200} xl={100} >
                    <Card>
                        <Card.Body><Button className="imageStyler"  onClick={handleClick}>image</Button></Card.Body>
                    </Card>
                
                </Col>
            </Row>
        
        </Container>
    )
    
}
export default EditorHome