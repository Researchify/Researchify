/**
 * This file exports an Email component used to display email input form.
 */

 import React from 'react';
 import Form from 'react-bootstrap/Form'

class Email extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
    }

    updateValue = form => {
        const {name, value} = form.target
        this.setState({[name]: value})
    }

    render() {
        console.log("email:" + this.state.email);
        return(
            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={this.updateValue} name="email" placeholder="Enter email" />
            </Form.Group>
            </Form>
        );
    }
}

 export default Email;