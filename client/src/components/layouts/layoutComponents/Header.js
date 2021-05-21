import React from "react"
import { Navbar, Nav} from "react-bootstrap"
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';
import {BsPeopleCircle} from 'react-icons/bs'

import "./Header.css"

import { Fragment } from "react";

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = (props) => {
    // const userName = useSelector(state => state.user?.givenName + " " + state.user?.familyName);
    const userName = "Albert Einstein"; // hard coded name for demo

    //TODO: Remove hard-coded team id and publications id from the links
    console.log(props)
    return (
        <Fragment>
            <Navbar className="header" sticky="top">
            <Navbar.Brand><Link className="header-brand" to={props.data.dashboardURL}>{props.data.title}</Link></Navbar.Brand>
                <Nav className="mr-auto" />

                <Nav.Link className="header-username">
                    <Link className="header-link" to={props.data.profileURL}>
                        {userName}
                        <BsPeopleCircle className="header-profile-icon" /> 
                    </Link>
                </Nav.Link>
            </Navbar>
        </Fragment>
    )
}

export default Header
