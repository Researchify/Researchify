import React from "react"
import {Card, Button} from "react-bootstrap"


const HomeSectionCard = (props) => {
    if (props.info.content == null || props.info.content === ""){
        return (<> </>)
    }
    else{
        return (
            <>
                <Card className="text-center">
                    <Card.Header> <Card.Title> {props.info.title}</Card.Title> </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {props.info.content}
                        </Card.Text>
                        <Button variant="primary">Edit Section</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted"/>
                </Card>
            </>
        )
    }


}


export default HomeSectionCard