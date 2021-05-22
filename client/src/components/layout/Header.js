import React, {Fragment} from "react"
import {Nav, Navbar} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux';
import {BsPeopleCircle} from 'react-icons/bs'

import "./Header.css"

/**
 * This function provides header for Layout.js
 * @returns Header component to be rendered in Layout.js
 */
const Header = ({title, urls}) => {
    const userName = useSelector(state => state.user?.givenName + " " + state.user?.familyName);
    //TODO: Remove hard-coded team id and publications id from the links
    return (
        <Fragment>
            <Navbar className="header" sticky="top">
                <Navbar.Brand><Link className="header-brand" to={urls.dashboard}>{title}</Link></Navbar.Brand>
                <Nav className="mr-auto" />
                <Nav>
                    <Nav.Link className="header-profile">
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
