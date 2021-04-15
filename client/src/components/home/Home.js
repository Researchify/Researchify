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
                <div className="homePageLinks" ><h3><span> <a href = "/auth" style={{textDecorationLine:'none',color: 'black'}}> Login</a>  <a style={{color: 'black'}}> | </a><a href = "/register" style={{textDecorationLine:'none',color: 'black'}}> Register </a></span></h3></div>
            </div>
        </div>
    );
};

export default Home;
