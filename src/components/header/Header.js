import { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import Showerdude from '../../logos/showerdude.jpg'

import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";

import APIService from "../../apiService";

function Header(props) {

  let client = new APIService();

  const [errorMessage, setErrorMessage] = useState(null);

  let handleSignOut = (event) => {
    client.logout(props.auth.token).then((response) => {
      // handle success
      localStorage.removeItem('auth');
      props.actions.logout()
    })
      .catch((error) => {
        console.log(error)
        // handle error
        setErrorMessage(error.response.data.message)
      })
  }

  let authLinks = ""
  if (props.isAuthenticated) {
    authLinks = (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Navbar.Text className="font-weight-bold">
              Signed in as: {props.auth.username}
            </Navbar.Text>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </>
    )
  }

  return (
    <div className="Navbar mb-3">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/"><img src={Showerdude} width="100px" /> ShowerThoughtz</Navbar.Brand>
        {authLinks}
      </Navbar>
      {errorMessage && <div className="container mt-3"><Alert variant="danger">{errorMessage}</Alert></div>}
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
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
