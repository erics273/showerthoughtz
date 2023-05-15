import React, { useState} from 'react';
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { getUserGravatar } from "../../utils/authHelper";

const Profile = ({props}) => {

  
  
  return (

    <>
    <Header />
    
    <div className="d-flex justify-content-center">
      <Container className="mt-3" style={{ textAlign: 'center' }}>
        <Row>
          <Col md={4}>
            <Image src="https://via.placeholder.com/250"  roundedCircle fluid />
            {/* {props.getUserGravatar(props.username)} */}
            
          </Col>
          <Col md={8}>
            {/* <h2>{props.thoughtshit.username}</h2> */}
            <p>This is a bio paaaage</p>
            <Button variant="primary">Edit Profile</Button>
          </Col>
        </Row>
      </Container>
    </div>
</>
);
};

export default Profile