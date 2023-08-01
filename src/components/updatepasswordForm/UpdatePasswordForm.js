
import React, { useState } from "react";
import { generateAuthHeader } from "../../utils/authHelper";
import { Form, Button, Alert } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function UpdatePasswordForm({ username }) {
   const [passwordData, setPasswordData] = useState({
    currentPassword: username.password,
    newPassword: "",
    // confirmPassword: "",
  });
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handlePasswordChange = (event) => {
    const { id, value } = event.target;
    setPasswordData({ ...passwordData, [id]: value });
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();

    // Perform validation
    if (
      // !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordErrorMessage("You didn't fill out all fields.");
      return;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrorMessage("New password doesn't match the confirmed password.");
      return;
    } 
    // ********this is ruining EVERY THING*******
    // else if (passwordData.currentPassword !== passwordData.currentPassword) {
    //   setPasswordErrorMessage("Current password iss WROONG");
    //   return;
    // }
    // *********************************************************************

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
          body: JSON.stringify({ password: passwordData.newPassword }), // Send the new password in the "password" field
        }
      );

      console.log("Username:", username);
      console.log("Actual password:", passwordData.password);
      console.log("Password data:", passwordData);
      // console.log("Current password:", passwordData.currentPassword);

      if (response.status < 200 || response.status > 299) {
        throw new Error("Password update failed.");
      }

      setSuccessMessage("Password updated successfully.");


      // Clear the password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        // confirmPassword: "",
      });
      
      setPasswordErrorMessage(null); // Reset error message on successful update
    } catch (error) {
      console.error(error);
      setPasswordErrorMessage("Password update failed. Please try again.");
    }
  };

  // const toggleCurrentPasswordVisibility = () => {
  //   setShowCurrentPassword((prevState) => !prevState);
  // };

  return (
    <div className="UpdatePasswordForm">
      {passwordErrorMessage && (
        <Alert variant="danger">{passwordErrorMessage}</Alert>
      )}

{successMessage && <Alert variant="success">{successMessage}</Alert>}

      <h2>Update Password</h2>

      <Form>
        {/* <Form.Group controlId="currentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={passwordData.currentPassword}
            type={showCurrentPassword ? "text" : "password"}
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
            {showCurrentPassword ? "Hide" : "Show"}
          </Form.Text>
        </Form.Group> */}
{/* ********************************************************* */}



        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={passwordData.newPassword}
            type="password"
            placeholder="Enter your new password"
          />
        </Form.Group>




{/* ******************************************************** */}
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




// Name and bio is not updating in real time
// Font makes it seem like everything is capslock. Its a problem in the updating
// clean up thing in the terminal

// remove the "current password"