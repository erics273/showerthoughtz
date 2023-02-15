import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { generateAuthHeader } from "../../utils/authHelper";

import { Redirect, withRouter } from "react-router-dom";


class PostForm extends Component {

    state = {
        errorMessage: null,
        successMessage: null,
        postData: {
            text: "",
        }
    }


    handleChange = (event) => {
        let tempPostData = { ...this.state.postData };
        tempPostData[event.target.id] = event.target.value;
        this.setState({ postData: tempPostData });
    }



    handleSubmit = async (event) => {
        event.preventDefault();

        try {

            console.log(this.state.postData)
            let response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
                method: "POST", // or 'PUT'
                


                headers: {
                    "Content-Type": "application/json",
                    ...generateAuthHeader()
                },
                body: JSON.stringify(this.state.postData),
            
            });
            console.log(response)
            if (response.status < 200 || response.status > 299) {
                throw Error(response.statusText);
            }
            this.setState({ successMessage:"Post Submitted" })


            let data = await response.json()
            console.log('Success:', data);
            this.props.getPostsProp()

            this.setState({
                postData: { text:"" }

            })

        }
        catch (error) {
            console.error(error.message);

            this.setState({ errorMessage: "Post FAAAILED!!!" });
        }


    }

    render() {
        return (
            <div className="PostForm container">

                {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}
                {this.state.successMessage && <Alert variant="success">{this.state.successMessage}</Alert>}


                <h2 className="text-center" >Post something</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>Post</Form.Label>
                        <Form.Control onChange={this.handleChange} autoFocus value={this.state.postData.text} type="text" placeholder="Whatcha thinkin?" required minLength="3" maxLength="100" />
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
