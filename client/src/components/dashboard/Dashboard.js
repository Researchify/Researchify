import { Container, CardGroup, Card, Button } from 'react-bootstrap';
/** icons **/
import { BsPencilSquare, BsServer, BsDisplayFill } from 'react-icons/bs'
/** css **/
import './Dashboard.css'


const Dashboard = () => {
    return (

        <Container fluid>
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button>Build a new Website</Button>
                </Card.Body>

                <Card.Body className="researchify-dashboard-card-description">
                    Click the button to enter Personal Acess Token and get started.
                </Card.Body>

                {/* Bottom layer of the three icons */}
                <CardGroup className="researchify-dashboard-card-group">
                    <Card>
                        <Card.Body>
                            <BsPencilSquare className="researchify-dashboard-card-icons" />
                        </Card.Body>
                        <p>Editor</p>
                    </Card>
                    <Card>
                        <Card.Body>
                            <BsServer className="researchify-dashboard-card-icons" />
                        </Card.Body>
                        <p>API Acess Manager</p>
                    </Card>
                    <Card>
                        <Card.Body>
                            <BsDisplayFill className="researchify-dashboard-card-icons" />
                        </Card.Body>
                        <p>Website</p>
                    </Card>
                </CardGroup>
                
            </Card>
        </Container>

    )
}

export default Dashboard
