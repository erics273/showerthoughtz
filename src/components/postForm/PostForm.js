import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Redirect, withRouter, Link } from "react-router-dom";


class PostForm extends Component {

    state = {
        errorMessage: null,
        success: false,
        formData: {
            thoughts: "",
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
    }

    render() {
        if (this.state.success) {
            return <Redirect to="/" />
        }
        return (
            <div className="PostForm container">

                {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}

                <h2 className="text-center" >Post something</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="post">
                        <Form.Label>Post</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.posts} type="text" placeholder="Whatcha thinkin?" />
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
