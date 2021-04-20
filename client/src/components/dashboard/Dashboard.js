import React from 'react'
import Layout from '../layout/Layout'
import './Dashboard.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import cardPicture from './banana-leaf-macro-green-micro-banner.jpg'

function PageContent() {
    return (
        <main class="mdl-layout__content">
            <div class="page-content">

                <div class="mdl-grid">

                    <Card className="page-card">
                        <Card.Img className="page-img" variant="top" src={cardPicture} />
                            <Card.ImgOverlay>
                                <Card.Link className="page-share-icon" href='#'>Share Page Icon</Card.Link>
                                <Card.Text className="page-title">Page 1</Card.Text>
                            </Card.ImgOverlay>
                        <Card.Body>
                            <Card.Text>
                                Description of Page 1..... (btw this card is using react-bootstrap)
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Link className="page-manage" href='#'>Manage Page</Card.Link>
                        </Card.Body>
                    </Card>

                    <div class="mdl-cell mdl-cell--8-col">
                        <div class="mdl-card mdl-shadow--3dp">
                            <div class="mdl-card__title">
                                <h2 class="mdl-card__title-text">Page 2</h2>
                            </div>
                            <div class="mdl-card__supporting-text">
                                Description of Page 2......
                            </div>
                            <div class="mdl-card__actions mdl-card--border">
                                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                    Manage Page
                                </a>
                            </div>
                            <div class="mdl-card__menu">
                                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i class="material-icons">share</i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="mdl-cell mdl-cell--8-col">
                        <div class="mdl-card mdl-shadow--3dp">
                            <div class="mdl-card__title">
                                <h2 class="mdl-card__title-text">Page 3</h2>
                            </div>
                            <div class="mdl-card__supporting-text">
                                Description of Page 3......
                            </div>
                            <div class="mdl-card__actions mdl-card--border">
                                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                    Manage Page
                                </a>
                            </div>
                            <div class="mdl-card__menu">
                                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                    <i class="material-icons">share</i>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    )
}


function Dashboard() {
    return Layout(PageContent)
}

export default Dashboard
