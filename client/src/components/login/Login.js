/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
    return (
        <div>
            Login Component
            <br />

            <form action="http://localhost:5000/users/login" method="post">
                Email: <input type="email" name="email"></input><br />
                Password: <input type="password" name="password"></input><br />
                <input type="submit" name="submit" value="Login"></input>
            </form>
        </div>
    );
};

export default Login;