/**
 * This file exports an Auth component used to display sign-ins and sign-ups.
 */
import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
    }

    loginHandler = (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        });

        fetch('http://localhost:5000/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: body
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("token", JSON.stringify(data));
            // document.getElementById('output').innerHTML += 'You have logged in<br>';
        })
    }

    protectedRequest = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            token = { token: '' }
        } else {
            token = JSON.parse(token);
            if (!token.token) {
                token = { token: '' }
            }
        }
        console.log(token)

        fetch('http://localhost:5000/protected', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token.token
            }
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('output').innerHTML += data + '<br>';
        })
    }

    render() {
        return (
            <div>
                Login Component
                <br />
    
                <form onSubmit={this.loginHandler} action="http://localhost:5000/users/login" method="post">
                    Email: <input type="email" name="email" id="email"></input><br />
                    Password: <input type="password" name="password" id="password"></input><br />
                    <input type="submit" name="submit" value="Login"></input>
                </form>

                <br />

                <button onClick={this.protectedRequest}>Make Protected Request</button>

                <div id="output"></div>
            </div>
        );
    }
}