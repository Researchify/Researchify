/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React from 'react';
import './home.css'
<<<<<<< HEAD
import {useDispatch, useSelector} from 'react-redux';
=======
>>>>>>> main

import {Link} from 'react-router-dom';



const Home = () => {

    return (
        <div className="homePage">
            <div className="homePageTitleBox">
                <h1 className="homePageTitle" >Researchify</h1>
                <div className="homePageLinks" >
                    <h3>
                        <span> 
<<<<<<< HEAD
                            <Link className='homeNavLink' to='/auth' style={{textDecorationLine:'none',color: 'black'}}>
                                Login
                            </Link>
=======
                            <Link className='homeNavLink' to='/login' style={{textDecorationLine:'none',color: 'black'}}>
                                Login
                            </Link>
                                |
>>>>>>> main
                            <Link className='homeNavLink' to='/register' style={{textDecorationLine:'none',color: 'black'}}>
                                Register
                            </Link>
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Home;
