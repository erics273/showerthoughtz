

import React, { useEffect, useState } from "react";
import {
  getUserGravatar,
  getUserLikes,
  getUserName,
  generateAuthHeader,
} from "../../utils/authHelper";
import Header from "../../components/header/Header";
import UpdateForm from "../../components/updateForm/UpdateForm";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams, Link, useLocation } from "react-router-dom";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";


const Profile = ({isAuthenticated}) => {
  const { username } = useParams();
  const location = useLocation();
  const [numPosts, setNumPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userBio, setBio] = useState(""); 
  const [userInfo, setUserInfo] = useState({})

  const toggleUpdateForm = () => {
    setShowUpdateForm((prevState) => !prevState);
  };

  // ********Getting specific users posts********

  const getNumUserPosts = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts?username=${username}`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
        }
      );

      let data = await response.json();
      setNumPosts(data);
      console.log("Here are " + username + " posts:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUser = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/${username}`,
        {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
        }
      );

      let data = await response.json();
      setUserInfo(data)
      let userBio = data.bio;
      let userFullname = data.fullName;
      setBio(userBio); // Update the bio state with the user's bio
      console.log("Here is the user fullname:", userFullname);
      console.log("Here is the user bio:", userBio);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ********Getting specific users likes********

  useEffect(() => {
    getNumUserPosts();
    getUser();
    console.log("getNumUserPosts successful");
  }, [userBio]);

  // *** Calculate total likes ***
  useEffect(() => {
    let totalLikes = 0;

    numPosts.forEach((post) => {
      totalLikes += post.likes.length;
    });

    setNumLikes(totalLikes);
  }, [numPosts]);

  console.log(username);
  console.log("Likes:", numPosts);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />

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
            <Col className="Luckyguy" md={8}>
              <h2>{userInfo.username}</h2>
              <p>{userInfo.bio}</p>
              <p>Likes: {numLikes}</p>
              <p>Posts: {numPosts.length}</p>
                <Button onClick={toggleUpdateForm} variant="primary">
                  Edit Profile
                </Button>
              
              {showUpdateForm && <UpdateForm userInfo={userInfo} setBio={setBio}  />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default mustBeAuthenticated (Profile);


// Bio and fullname updates but it need to only update the user that is logged in.
// Update success message????
// Hide Edit button for non logged in user. compare username in URL to username that is logged in.
// Display my own error message to non logged in user
// ditch "setBio" and use the UserInfo. remember the useeffct dependansies array

// change password?? dont send if not typed??