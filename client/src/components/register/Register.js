/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Register = () => {
    return (
        <div>
            Register Component
            <br />

            <form action="http://localhost:5000/users" method="post">
                Name: <input type="text" name="name"></input><br />
                Email: <input type="email" name="email"></input><br />
                Password: <input type="password" name="password"></input><br />
                <input type="submit" name="submit" value="Register"></input>
            </form>
        </div>
    );
};
 
export default Register;