import React, { useState } from "react";
import { generateAuthHeader } from "../../utils/authHelper";
import { Form, Button, Alert } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function UpdatePasswordForm({ username }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

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

      console.log("Username:", username);
      console.log("Password data:", passwordData);

      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }
      console.log(username);

      // Clear the password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      setPasswordErrorMessage(error.message);
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prevState) => !prevState);
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
            type={showCurrentPassword ? "text" : "password"} // Show current password
            placeholder="Enter your current password"
          />
          <Form.Text
            style={{ cursor: "pointer", fontSize: "90%", opacity: 0.5 }}
          >
            {showCurrentPassword ? (
              <BsEyeSlashFill
                onClick={toggleCurrentPasswordVisibility}
                style={{ cursor: "pointer", fontSize: "125%" }}
              />
            ) : (
              <BsEyeFill
                onClick={toggleCurrentPasswordVisibility}
                style={{ cursor: "pointer", fontSize: "125%" }}
              />
            )}
            {/* Eye icons for toggling current password visibility */}
            {showCurrentPassword ? "Hide" : "Show"}
          </Form.Text>
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

// Update password does not successfully update yet
