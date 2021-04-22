/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React from 'react';
import './home.css'
import {useDispatch, useSelector} from 'react-redux';


import {getFoos} from '../../actions/foo';


const Home = () => {
    const dispatch = useDispatch();
    const foos = useSelector(state => state.foo);

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
