import {Card,Row,Col,Image} from 'react-bootstrap'

import cardIcon from "./dropdown-arrow.png"
import cardPicture from './banana-leaf-macro-green-micro-banner.jpg'

function PageCard(pageTitle, pageDesc) {
    return (
        
            <Row className="page-row">
                <Col>
                    <Card className="page-card">
                        <Card.Img className="page-img" variant="top" src={cardPicture} />
                        <Card.ImgOverlay>
                            <Card.Link className="page-icon" href='#'><Image src={cardIcon}/></Card.Link>
                            <Card.Text className="page-title">{pageTitle}</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <Card.Text className="page-desc">
                                {pageDesc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link className="page-manage" href='#'>Manage Page</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    )
}

export default PageCard
