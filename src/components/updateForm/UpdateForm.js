import React, { useState, useEffect } from "react";
import { generateAuthHeader } from "../../utils/authHelper";
import { withRouter } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

function UpdateForm({ userInfo, getUser }) {
  const username = userInfo.username;
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: userInfo.fullName,
    bio: userInfo.bio,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the form fields are empty
    if (!formData.fullName || !formData.bio) {
      setErrorMessage("You didn't type anything");
      return;
    }

    // Check if the form data is unchanged
    if (
      formData.fullName === userInfo.fullName &&
      formData.bio === userInfo.bio
    ) {
      setErrorMessage("No change detected.");
      return;
    }

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

      setErrorMessage(null);

      // Update the bio state
      // userInfo.fullName = formData.fullName;
      // userInfo.bio = formData.bio;
      getUser();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setFormData({
      fullName: userInfo.fullName,
      bio: userInfo.bio,
    });
  }, [userInfo.fullName, userInfo.bio]);
  return (
    <div className="AltLuckyguy">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <p></p>
      <p></p>
      <h2 className="Luckyguy"> Update {username}</h2>
      <Form className="Luckyguy">
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className="Ultra"
            onChange={handleChange}
            value={formData.fullName}
            type="text"
            placeholder="Enter your full name"
          />
        </Form.Group>

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            className="Ultra"
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
