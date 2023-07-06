import React, { useState } from "react";
import { generateAuthHeader } from "../../utils/authHelper";
import { Form, Button, Alert } from "react-bootstrap";

function UpdatePasswordForm({ username }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

  const handlePasswordChange = (event) => {
    const { id, value } = event.target;
    setPasswordData({ ...passwordData, [id]: value });
   
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();


  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
          body: JSON.stringify(passwordData),
          
        }
        
       
      );
   


      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }

      // Clear the password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Display success message or perform any additional actions
    } catch (error) {
      console.error(error);
      setPasswordErrorMessage(error.message);
    }
  };

  return (
    <div className="UpdatePasswordForm">
      {passwordErrorMessage && (
        <Alert variant="danger">{passwordErrorMessage}</Alert>
      )}

      <h2>Update Password</h2>

      <Form>
        <Form.Group controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={passwordData.currentPassword}
            type="password"
            placeholder="Enter your current password"
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={passwordData.newPassword}
            type="password"
            placeholder="Enter your new password"
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={passwordData.confirmPassword}
            type="password"
            placeholder="Confirm your new password"
          />
        </Form.Group>

        <Button
          onClick={handleSubmitPassword}
          style={{ color: "black" }}
          variant="primary"
          type="submit"

        >
          Update Password
        </Button>
        
      </Form>
    </div>
  );
}

export default UpdatePasswordForm;

// Display my own error message to non logged in user
// ditch "setBio" and use the UserInfo. remember the useeffct dependansies array
// Update profile in real time without having to refresh

// change password?? dont send if not typed??
