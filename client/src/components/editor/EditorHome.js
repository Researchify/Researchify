import React from "react"
import {Container,Row,Col,Card,Button} from "react-bootstrap"

const handleClick = () => {

    console.log("Workaye");
    return(
        <Card>
                <Card.Body>Workaye</Card.Body>
        </Card>
    )

}
const EditorHome=()=>{
    return(
        <Card>
                <Card.Body><Button className="buttonStyler" onClick={handleClick}>+</Button></Card.Body>
        </Card>

    )
    
}
export default EditorHome