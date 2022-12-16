import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { connect } from "react-redux";
import * as authActions from "../../redux/actions/auth";
import { bindActionCreators } from "redux";

import APIService from "../../apiService";
import { Redirect, withRouter } from "react-router-dom";


class Login extends Component {

    state = {  
        errorMessage: null,
        success: false,
        formData: {
            username: "",
            password: ""
        }
    }

    client = new APIService();

    handleChange = (event) => {
        let formData = {...this.state.formData};
        formData[event.target.id] = event.target.value;
        this.setState({formData});
    }

    

    handleSubmit = (event) => {
        event.preventDefault();
        this.client.login(this.state.formData).then((response) => {
            // handle success
            localStorage.setItem('auth',
                JSON.stringify({
                    token: response.data.token,
                    username: response.data.username
                })
            );
            this.props.actions.login(response.data)
            this.setState({success: true})
          })
          .catch((error) => {
            // handle error
            this.setState({errorMessage: error.response.data.message})
          })
    }

    render() {
        if(this.state.success){
            const params = new URLSearchParams(this.props.location.search);
            const redirect = params.get('redirect'); 
            return <Redirect to={(redirect) ? redirect : "/feed"} />
        }
        return (
            <div className="Login container">

                {this.state.errorMessage && <Alert variant="danger">{this.state.errorMessage}</Alert>}

                <h2 className="text-center" >Welcome to Social Network Lite</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.username} type="text" placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} value={this.state.formData.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button onChange={""} variant="primary" type="submit">
                       Register!!!!
                    </Button>
                   

                    
                </Form>
            </div>
        )
    }
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
)(withRouter(Login));
