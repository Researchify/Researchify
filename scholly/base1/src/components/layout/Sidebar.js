import React from 'react';
import {Nav} from 'react-bootstrap';
import './Sidebar.css'
import HeaderData from './HeaderData.js';
import { Link } from 'react-router-dom';
import {TEAM_INFO} from '../../global/data.js';

const Sidebar = () => {
    const headerData = HeaderData();
    const { orgName, teamName } = TEAM_INFO;
    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar me-auto"
                 activeKey="/home"
                 onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="landing-center-title">{teamName}</div>
                <div className="landing-title-org-name">{orgName}</div>
                {headerData.map((val) => {
                    return (
                        <Nav.Link style={{padding:20}} as={Link} to={val.link}>
                            {val.title}
                        </Nav.Link>
                    );
                })}
            </Nav>

        </>

    )
}

export default Sidebar