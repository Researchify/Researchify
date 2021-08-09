/**
 * The Publication component displays a single publication.
 */
import React, {useState} from 'react';
import {Button, Col, Row, Collapse} from 'react-bootstrap';
import {BsLink45Deg} from 'react-icons/bs'
import {GrLinkDown, GrLinkUp} from 'react-icons/gr'
import {IconContext} from "react-icons"
import '../publications.css'


const Publication = ({pub}) => {
    const [clicked, setClicked] = useState(false)

    const displayUpArrow = () => {
        return (
            clicked &&
            <IconContext.Provider value={{color: 'black', size: '25px'}}>
                <GrLinkUp style={{marginLeft: '10px'}}/>
            </IconContext.Provider>
        )
    }

    const displayDownArrow = () => {
        return (
            !clicked &&
            <IconContext.Provider value={{color: 'black', size: '25px'}}>
                <GrLinkDown style={{marginLeft: '10px'}}/>
            </IconContext.Provider>
        )
    }

    const dropDown = (
        <Collapse in={clicked}>
            <div style={{marginLeft: '15px', marginRight: '10px', marginBottom: '15px'}}>
                <h5>
                    <b>Description:</b> {pub.description}
                </h5>
                <h5>
                    <b>
                        {pub.category.type.charAt(0) +
                        pub.category.type.slice(1).toLowerCase()}:
                    </b> {pub.category.categoryTitle}
                </h5>

                { pub.category.issue && (<h5> <b>Issue:</b> {pub.category.issue} </h5>) }
                { pub.category.volume && (<h5> <b>Volume:</b> {pub.category.volume} </h5>) }
                { pub.category.pages && (<h5><b>Pages:</b> {pub.category.pages} </h5>) }
                { pub.category.publisher && (<h5> <b>Publisher:</b> {pub.category.publisher} </h5>) }
                
                <Row>
                    <Col md={11}>
                        {pub.link && (
                            <Button onClick={() => window.open(`${pub.link}`, '_blank')}>
                                <IconContext.Provider value={{color: 'black', size: '25px'}}>
                                    <BsLink45Deg/>
                                </IconContext.Provider>
                            </Button>
                        )}
                    </Col>
                    <Col md={1}>
                        <span onClick={() => setClicked(!clicked)}>
                            {displayUpArrow()}
                        </span>
                    </Col>
                </Row>
            </div>
        </Collapse>
    )

    return (
        <>
            <div className="modalHeader">
                <Row>
                    <Col md={11}>
                        <h3 style={{marginLeft: '15px', marginTop: '15px'}}>
                            {pub.title}
                        </h3>
                    </Col>
                </Row>
            </div>

            <div style={{marginLeft: '15px'}} className={clicked ? "mt-3" : "mt-3 mb-2"}>
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
            {dropDown}
        </>
    )
}

export default Publication