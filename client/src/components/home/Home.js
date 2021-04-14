/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React from 'react';
import './home.css'

const Home = () => {
    return (
        <div className="homePage">
            <div className="homePageTitleBox">
                <h1 className="homePageTitle" >Researchify</h1>
                <div className="homePageLinks"><h3><span  > <a href = "/auth"> Login</a> <a> | </a><a href = "/register"> Register </a></span></h3></div>
            </div>
        </div>
    );
};

export default Home;
