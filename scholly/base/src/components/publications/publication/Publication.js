import React, {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import {BsLink45Deg} from 'react-icons/bs'
import {GrLinkDown, GrLinkUp} from 'react-icons/gr'
import {IconContext} from "react-icons"
import '../publications.css'

import PublicationBadge from "../attributes/PublicationBadge";

const Publication = ({pub}) => {
    const [clicked, setClicked] = useState(false)

    const displayUpArrow = () => {
        return (
            clicked &&
            <IconContext.Provider value={{color: 'black', size: '25px'}}>
                <GrLinkUp className="ml-2"/>
            </IconContext.Provider>
        )
    }

    const displayDownArrow = () => {
        return (
            !clicked &&
            <IconContext.Provider value={{color: 'black', size: '25px'}}>
                <GrLinkDown className="ml-2"/>
            </IconContext.Provider>
        )
    }

    const dropDown = (
        <div className="mb-3 ml-3 mr-2">
            <h5><b>Description:</b> {pub.description} </h5>
            <Row>
                <Col md={11}>
                    <Button onClick={() => window.open(`${pub.link}`, '_blank')}>
                        <IconContext.Provider value={{color: 'black', size: '25px'}}>
                            <BsLink45Deg/>
                        </IconContext.Provider>
                    </Button>
                </Col>
                <Col md={1}>
                    <span onClick={() => setClicked(!clicked)}>
                        {displayUpArrow()}
                    </span>
                </Col>
            </Row>
        </div>
    )

    return (
        <>
            <div className="modalHeader">
                <Row>
                    <Col md={11}>
                        <h3 className="ml-3 mt-3">
                            {pub.title}
                            <PublicationBadge/><PublicationBadge/>
                        </h3>
                    </Col>
                </Row>
            </div>

            <div className={clicked ? "ml-3 mt-3" : "ml-3 mt-3 mb-2"}>
                <h5><b> Authors: </b>{pub.authors.map((author) => `${author}`).join(', ')}</h5>
                <Row>
                    <Col md={11}>
                        <h5 className={clicked ? "" : "blur"}><b>Year Published: </b>{pub.yearPublished} </h5>
                    </Col>
                    <Col md={1}>
                        <span onClick={() => setClicked(!clicked)}>
                            {displayDownArrow()}
                        </span>
                    </Col>
                </Row>
            </div>
            {clicked && dropDown}
        </>
    )
}

export default Publication