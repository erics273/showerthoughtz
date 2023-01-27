import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Redirect, withRouter, Link } from "react-router-dom";


class RegisterForm extends Component {

    state = {
        errorMessage: null,
        success: false,
        formData: {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: ""
        }
    }


    handleChange = (event) => {
        let tempFormData = { ...this.state.formData };
        tempFormData[event.target.id] = event.target.value;
        this.setState({ formData: tempFormData });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        // This is where we make the API call POST/api/users


        fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.formData),
        })


        // ********** attempt at fixing the 404 ************
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((jsonResponse) => {
                // do whatever you want with the JSON response
            }).catch((error) => {
                // Handle the error
                console.log(error);
            });




// ******* OG Code *********

        // .then((response) => response.json())
        // .then((data) => {
        //     if (response.status >= 200 && response.status <= 299){
        //     this.setState({ success: true })
        //     console.log('Success:', data);
        // }})
        // .catch((error) => {
        //     this.setState({ errorMessage: error.response.data.message })
        //     console.error('Error:', error);
        // });
    }

    render() {
        if (this.state.success) {
            return <Redirect to="/" />
        }
        return (
            <div className="RegisterForm container">

                {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}

                <h2 className="text-center" >Come on in, the water is fine</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Create a Username</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.username} type="text" placeholder="Create a user name!" />
                    </Form.Group>

                    <Form.Group controlId="fullName">

                        <Form.Label>Whats your full name?</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.fullName} type="text" placeholder="fullname!" />
                    </Form.Group>


                    <Form.Group controlId="password">
                        <Form.Label>Create a Password</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.password} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.confirmPassword} type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Button
                        // as={Link} to="/feed" 
                        variant="primary" type="submit">
                        Submit
                    </Button>


                </Form>



            </div>
        )
    }
}



export default withRouter(RegisterForm);
