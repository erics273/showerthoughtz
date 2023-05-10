
import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { generateAuthHeader } from "../../utils/authHelper";
import { Redirect, withRouter } from "react-router-dom";


function PostForm(props) {

    let [errorMessage, setErrorMessage] = useState(null);
    let [successMessage, setSuccessMessage] = useState(null);
    let [postData, setPostData] = useState({ text: "" });

    let handleChange = (event) => {
        let tempPostData = { ...postData };
        tempPostData[event.target.id] = event.target.value;
        setPostData(tempPostData);
    }

    let handleSubmit = async (event) => {
        event.preventDefault();

        console.log ("form submitted")

        try {
            console.log(postData);
            let response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...generateAuthHeader()
                },
                body: JSON.stringify(postData),
            });

            console.log(response);
            if (response.status < 200 || response.status > 299) {
                throw Error(response.statusText);
            }
            setSuccessMessage("Post Submitted");
            let data = await response.json();
            
            console.log('Success:', data);
            props.getPostsProp();
            setPostData({ text: "" });
        }
        catch (error) {
            console.error(error.message);
            setErrorMessage("Post FAAAILED!!!");
        }
    }



return (
    <div className="PostForm container">

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}


        <h2 className="text-center">Post something</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="text">
                <Form.Label></Form.Label>
                <Form.Control onChange={handleChange} autoFocus value={postData.text} type="text" placeholder="Whatcha thinkin?" required minLength="3" maxLength="255" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginBottom: '20px' }}>
                Submit
            </Button>
           
            
          


        </Form>


    </div>
);

};

export default withRouter(PostForm);
