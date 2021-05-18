import React from "react"
import { Navbar, Nav, Image } from "react-bootstrap"
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';
import {BsPeopleCircle} from 'react-icons/bs'

import "./Header.css"

import { Fragment } from "react";

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = ({data}) => {
    const userName = useSelector(state => state.user?.givenName + " " + state.user?.familyName);
    //TODO: Remove hard-coded team id and publications id from the links
    return (
        <Fragment>
            <Navbar className="header" sticky="top">
                <Navbar.Brand><Link className="header-brand" to="/dashboard">Researchify</Link></Navbar.Brand>          
                <Nav>
                    <Nav className="mr-auto">
                    {
                        data.map((val,key)=> {
                            
                            return(
                                <Nav.Link>
                                <Link key={key} className={"header-link"} to={val.link}>{val.title}</Link>
                                </Nav.Link> 
                            )
                        })
                    }
                </Nav>
                </Nav>
                <Nav>
                <Nav.Link className="header-username">
                        <Link className="header-link" to="/dashboard/profile">
                            <BsPeopleCircle className="header-profile-icon" /> {userName}
                        </Link>
                    </Nav.Link>
                    </Nav>
            </Navbar>
        </Fragment>
    )
}

export default Header
