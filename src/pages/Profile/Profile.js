import React from "react";
import { getUserGravatar, getUserName } from "../../utils/authHelper";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import md5 from "md5";

const Profile = () => {
  const { username } = useParams();

  const gravatarUrlProfilePic = getUserGravatar(username);
  const profileUserName = getUserName(username);

  console.log(username);
  console.log(gravatarUrlProfilePic);
  console.log(profileUserName);

  return (
    <>
      <Header />

      <div className="d-flex justify-content-center">
        <Container className="mt-3" style={{ textAlign: "center" }}>
          <Row>
            <Col md={4}>
              <Image
                src={gravatarUrlProfilePic}
                roundedCircle
                fluid
                style={{ width: "200px", height: "200px" }}
              />
            </Col>
            <Col md={8}>
              <h2>{profileUserName}</h2>
              <p>This is a bio page</p>
              <Button variant="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
