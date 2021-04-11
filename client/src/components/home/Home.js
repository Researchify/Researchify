/**
 * This file exports a home component that displays the main screen/homepage.
 */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';


import {getFoos} from '../../actions/foo';


const Home = () => {
    const dispatch = useDispatch();
    const foos = useSelector(state => state.foo);

    return (
        <div>
            Home Component.
            <br />
            <button onClick={() => dispatch(getFoos())}>Click To Get Foos</button>
            <br />
            {
                foos
            }
        </div>
    );
};

export default Home;
