/** Redux **/
import { useDispatch, useSelector } from 'react-redux';
import { createWebsite } from '../../actions/website';

import { Link } from 'react-router-dom';
import { Container, CardGroup, Card, Button, } from 'react-bootstrap';
/** icons **/
import { BsPencilSquare, BsServer, BsDisplayFill } from 'react-icons/bs'
/** css **/
import './Dashboard.css'


const Dashboard = () => {
    const dispatch = useDispatch();
    const websiteIsCreated = useSelector(state => state.website.isCreated);

    return (

        <Container fluid className="researchify-dashboard-container">
            <Card className="text-center researchify-dashboard-card">

                <Card.Body>
                    <Button onClick={() => dispatch(createWebsite())}>
                        {websiteIsCreated ? "Build a new Website" : "Edit the Website"}
                    </Button>
                </Card.Body>

                <Card.Body className="researchify-dashboard-card-description">
                    Click the button to enter Personal Acess Token and get started.
                </Card.Body>

                {/* Bottom layer of the three icons */}
                <CardGroup className="researchify-dashboard-card-group">
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsPencilSquare className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>Editor</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsServer className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>API Acess Manager</p>
                        </Link>
                    </Card>
                    <Card>
                        <Link className="researchify-dashboard-card-link">
                            <Card.Body>
                                <BsDisplayFill className="researchify-dashboard-card-icons" />
                            </Card.Body>
                            <p>Website</p>
                        </Link>
                    </Card>
                </CardGroup>

            </Card>
        </Container>

    )
}

export default Dashboard
