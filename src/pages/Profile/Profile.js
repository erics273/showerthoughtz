

import React, { useEffect, useState } from "react";
import { getUserGravatar, getUserLikes, getUserName, generateAuthHeader } from "../../utils/authHelper";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import md5 from "md5";

const Profile = () => {
  const { username } = useParams();
  const [numLikes, setNumLikes] = useState([]);
  const [numPosts, setNumPosts] = useState([]);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const profileUserName = getUserName(username);


  // ********Getting specific users posts********

  const getNumUserPosts = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts?username=${username}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          ...generateAuthHeader(),
        },
      });

      console.log(response);

      let data = await response.json();
      setNumPosts(data);

      console.log("Here are " + username + " posts:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

// ********Getting specific users likes********

  const getNumUserLikes = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/likes?username=${username}`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          ...generateAuthHeader(),
        },
      });

      console.log(response);

      let data = await response.json();
      setNumLikes(data);

      console.log("Here are " + username + " likes:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getNumUserPosts();
    console.log("getNumUserPosts successful");
  }, []);
  
  useEffect(() => {
    getNumUserLikes();
    console.log("getNumUserLikes successful");
  }, []);

  console.log(username);
  console.log(gravatarUrlProfilePic);
  console.log("numLikes:", numLikes);

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
              <h2>{username}</h2>
              <p>This is a bio page</p>
              <p>Likes: {numLikes.length}</p>
              <p>Posts: {numPosts.length}</p>
              <Button variant="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
