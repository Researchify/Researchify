/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React, { useEffect } from 'react';
import './home.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const { signIn } = useSelector(state => state.auth)
  useEffect(() => {
    if(signIn){
      history.push('/dashboard')
    }
  }, [history, signIn])
  return (
    <div className="homePage">
      <div className="homePageTitleBox">
        <h1 className="homePageTitle">Researchify</h1>
        <div className="homePageLinks">
          <h3>
            <span>
              <Link
                className="homeNavLink"
                to="/login"
                style={{ textDecorationLine: 'none', color: 'black' }}
              >
                Login
              </Link>
              |
              <Link
                className="homeNavLink"
                to="/register"
                style={{ textDecorationLine: 'none', color: 'black' }}
              >
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
