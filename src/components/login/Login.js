import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Showerlogin from "../../logos/Showerlogin.png";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import APIService from "../../apiService";
import { Redirect, withRouter, Link } from "react-router-dom";

function Login(props) {
  let [errorMessage, setErrorMessage] = useState(null);
  let [success, setSuccess] = useState(false);
  let [showPassword, setShowPassword] = useState(false); // New state variable
  let [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  let client = new APIService();

  let handleChange = (event) => {
    let updatedFormData = { ...formData };
    updatedFormData[event.target.id] = event.target.value;
    setFormData(updatedFormData);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await client.login(formData);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: response.data.token,
          username: response.data.username,
        })
      );

      props.actions.login(response.data);

      setSuccess(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  // ***Show password thang***
  let togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // ***************************

  if (success) {
    let params = new URLSearchParams(props.location.search);
    let redirect = params.get("redirect");
    return <Redirect to={redirect ? redirect : "/feed"} />;
  }
  return (
    <div className="Login container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Showerthoughts title */}
      <h2
        className="text-center"
        style={{
          fontFamily: "Luckiest Guy",
          backgroundColor: "wheat",
          fontSize: "50pt",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={Showerlogin}
            width="100px"
            style={{ marginRight: 10 }}
            alt="Left Pic"
          />
          <span style={{ fontWeight: "bold" }}>Log in</span>
          <img
            src={Showerlogin}
            width="100px"
            style={{ marginLeft: 10 }}
            alt="Right Pic"
          />
        </div>
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.username}
            type="text"
            placeholder="Username"
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            value={formData.password}
            type={showPassword ? "text" : "password"} // Show password as plain text when showPassword is true
            placeholder="Password"
          />
          <Form.Text  style={{ cursor: "pointer",  fontSize: "90%" ,opacity: 0.5}}>
            {showPassword ? (
              <BsEyeSlashFill
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", fontSize: "125%"}}
              />
            ) : (
              <BsEyeFill
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", fontSize: "125%"  }}

              />
            )}
            {/* Eye icons for toggling password visibility */}
            {showPassword ? "Hide password" : "Show password"}
            
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button as={Link} to="/register" variant="primary">
          Register!!!!
        </Button>
      </Form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
