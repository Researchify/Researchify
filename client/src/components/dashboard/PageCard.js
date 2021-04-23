import {Card,Row,Col,Image} from 'react-bootstrap'

import cardIcon from "./dropdown-arrow.png"
import cardPicture from './banana-leaf-macro-green-micro-banner.jpg'


/**
 * Function provides cards to display pages of user in dashboard.
 * @param {*} props Two props are needed for this function.
 *            props.pageTitle (string) The title of research page to be shown
 *            props.pageDesc (string)  The description of the research page to be shown under title       
 * @returns (HTML code) Content componenet to be put in the layout.
 */
function PageCard(props) {
    return (
        
            <Row className="page-row">
                <Col>
                    <Card className="page-card">
                        <Card.Img className="page-img" variant="top" src={cardPicture} />
                        <Card.ImgOverlay>
                            <Card.Link className="page-icon"><Image src={cardIcon}/></Card.Link>
                            <Card.Text className="page-title">{props.pageTitle}</Card.Text>
                        </Card.ImgOverlay>
                        <Card.Body>
                            <Card.Text className="page-desc">
                                {props.pageDesc}
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link className="page-manage">Manage Page</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    )
}

export default PageCard
