import React, { useState } from "react";
import {
  generateAuthHeader,
  getUserGravatar,
  getUserName,
} from "../../utils/authHelper";
import { withRouter, useParams } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function UpdateForm({ setBio }) {
  const { username } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${username}`,
        {
          method: "PUT", // Use PUT method for update
          headers: {
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }

      // Update the bio state
      setBio(formData.bio);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Update failed!");
    }
  };

  return (
    <div className="UpdateForm container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <p></p>
      <p></p>
      <h2 className="Luckyguy"> Update {username}</h2>
      <Form className="Luckyguy">
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.fullName}
            type="text"
            placeholder="Enter your full name"
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.bio}
            type="text"
            placeholder="Tell me something"
          />
        </Form.Group>

        <Button
          onClick={handleSubmit}
          style={{ color: "black" }}
          variant="primary"
          type="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(UpdateForm);
