import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { generateAuthHeader } from "../../utils/authHelper";

import { Redirect, withRouter } from "react-router-dom";


class PostForm extends Component {

    state = {
        errorMessage: null,
        postData: {
            thought: "",
        }
    }


    handleChange = (event) => {
        let tempPostData = { ...this.state.postData };
        tempPostData[event.target.id] = event.target.value;
        this.setState({ postData: tempPostData });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        // This is where we make the API call POST/api/users
        console.log(this.state.postData)
        fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                ...generateAuthHeader()

            },
            body: JSON.stringify({text: this.state.postData.thought}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    render() {
        return (
            <div className="PostForm container">

                {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}

                <h2 className="text-center" >Post something</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="thought">
                        <Form.Label>Post</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.postData.thought} type="text" placeholder="Whatcha thinkin?" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>


                </Form>


            </div>
        )
    }
}



export default withRouter(PostForm);
