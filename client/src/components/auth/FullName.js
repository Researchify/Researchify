/**
 * This file exports an Fullname component used to display first and last name input forms.
 */

 import React, { useState } from 'react';
 import Form from 'react-bootstrap/Form'
 import {Col, Row} from "react-bootstrap";

 function FullName() { 
     const [state, setState] = useState({
        givenName: '',
        familyName: ''
    });

    console.log("given name:" + state.givenName + "family name:" + state.familyName);

    const updateValue = (form) => {
        const {name, value} = form.target
        setState({[name]: value})
    };
   
    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col} md="6">
                    <Form.Label>Given name</Form.Label> 
                    <Form.Control type="text" onChange={updateValue} name="givenName" placeholder="Given name" />
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Family name</Form.Label> 
                    <Form.Control type="text" onChange={updateValue} name="familyName" placeholder="Family name" />
                </Form.Group>
            </Form.Row>
        </Form>
);
 }

// class FullName extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             givenName: '',
//             familyName: ''
//         }
//     }
    
//     updateValue = form => {
//         const {name, value} = form.target
//         this.setState({[name]: value})
//     }

//     render() {
//         console.log("given name:" + this.state.givenName + "family name:" +this.state.familyName);
//         return(
//                 <Form>
//                     <Form.Row>
//                         <Form.Group as={Col} md="6">
//                             <Form.Label>Given name</Form.Label> 
//                             <Form.Control type="text" onChange={this.updateValue} name="givenName" placeholder="Given name" />
//                         </Form.Group>
//                         <Form.Group as={Col} md="6">
//                             <Form.Label>Family name</Form.Label> 
//                             <Form.Control type="text" onChange={this.updateValue} name="familyName" placeholder="Family name" />
//                         </Form.Group>
//                     </Form.Row>
//                 </Form>
//         );
//     }
// }

 export default FullName;