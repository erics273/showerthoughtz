import React, { Component,useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Redirect, withRouter, Link } from "react-router-dom";
import { FormCheck } from "react-bootstrap";

// class RegisterForm extends Component {
//   state = {
//     errorMessage: null,
//     success: false,
//     formData: {
//       username: "",
//       fullName: "",
//       password: "",
//       confirmPassword: "",
//     },
//   };

//   handleChange = (event) => {
//     let tempFormData = { ...this.state.formData };
//     tempFormData[event.target.id] = event.target.value;
//     this.setState({ formData: tempFormData });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
//         method: "POST", // or 'PUT'

//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(this.state.formData),
//       });
//       console.log("resolved", response);

//       if (response.status < 200 || response.status > 299) {
//         throw Error(response.statusText);
//       }
//       this.setState({ success: true });

//       let data = await response.json();
//       console.log("new user created:", data);
//     } catch (error) {
//       console.error(error.message);
//       this.setState({ errorMessage: "No! Do it AGAIN!!!" });
//     }
//   };
// }

  // ***********************

  
function RegisterForm() {
  let [errorMessage, setErrorMessage] = useState(null);
  let [success, setSuccess] = useState(false);
  let [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  let handleChange = (event) => {
    let { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("resolved", response);

      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }
      setSuccess(true);

      const data = await response.json();
      console.log("new user created:", data);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("No! Do it AGAIN!!!");
    }
  };



    if (success) {
      return <Redirect to="/" />;
    }
    return (
      <div className="RegisterForm container">
        {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>
        )}

        <h2 className="text-center">Come on in, the water is fine</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Create a Username</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.username}
              type="text"
              placeholder="Create a user name!"
            />
          </Form.Group>

          <Form.Group controlId="fullName">
            <Form.Label>Whats your full name?</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.fullName}
              type="text"
              placeholder="fullname!"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Create a Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={formData.confirmPassword}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>

          <Button
            // as={Link} to="/feed"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
    
        }






export default withRouter(RegisterForm);

