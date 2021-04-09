/**
 * This file exports an Password component used to display password input form with confirmation.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'
 
class PasswordWithConfirmation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            confirmPassword: ''
        }
    }
    
    updateValue = form => {
        const {name, value} = form.target
        this.setState({[name]: value})
    }

    render() {
        console.log("password:" + this.state.password + "confirm password:" +this.state.confirmPassword);
        return(
            <Form>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.updateValue} name="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" onChange={this.updateValue} name="confirmPassword" placeholder="Password" />
            </Form.Group>
            </Form>
        );
    }
}

 export default PasswordWithConfirmation;