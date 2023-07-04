

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
import { isAuthenticated } from "../../utils/authHelper";
import UpdatePasswordForm from "../../components/updatepasswordForm/UpdatePasswordForm";

const Profile = () => {
  const { username } = useParams();
  const location = useLocation();
  const [numPosts, setNumPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userBio, setBio] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);

// ****Form toggles****
  const toggleUpdateForm = () => {
    setShowUpdateForm((prevState) => !prevState);
  };

  const toggleUpdatePasswordForm = () => {
    setShowUpdatePasswordForm((prevState) => !prevState);
  };
// ****End of Form toggles****
  
const getTotalLikes = (posts) => {
    let totalLikes = 0;

    posts.forEach((post) => {
      totalLikes += post.likes.length;
    });

    return totalLikes;
  };


  // new auth stuff for Edit profile
  const isUserAuthenticated = isAuthenticated();
  const loggedInUsername = getUserName();

  useEffect(() => {
    // Fetch user data and update state
    getUser();
    getNumUserPosts();
  }, [username]); // Run the effect whenever the username changes

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
      setUserInfo(data);
      setBio(data.bio);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const getNumUserPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNumPosts(data);
        setNumLikes(getTotalLikes(data)); // Calculate the total likes
      } 
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect(() => {
    getUser();
    getNumUserPosts();
  }, [username]);


  const isCurrentUser = loggedInUsername === username;
  

  return (
    <>
      <Header isAuthenticated={isUserAuthenticated} />

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
              <p>{userInfo.fullName}</p>
              <p>{userInfo.bio}</p>
              <p>Likes: {numLikes}</p>
              <p>Posts: {numPosts.length}</p>
              {isUserAuthenticated && isCurrentUser && (
                <>
                  <Button onClick={toggleUpdateForm} variant="primary">
                    Edit Profile
                  </Button>
                  <Button onClick={toggleUpdatePasswordForm} variant="primary">
                    Update Password
                  </Button>
                  {showUpdateForm && <UpdateForm userInfo={userInfo} setBio={setBio} />}
                  {showUpdatePasswordForm && <UpdatePasswordForm username={username} />}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default mustBeAuthenticated(Profile);




// Display my own error message to non logged in user
// ditch "setBio" and use the UserInfo. remember the useeffct dependansies array
// Update profile in real time without having to refresh

// change password?? dont send if not typed??