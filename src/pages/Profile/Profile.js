import React, { useEffect, useState } from "react";
import {getUserGravatar,getUserName,generateAuthHeader,} from "../../utils/authHelper";
import Header from "../../components/header/Header";
import UpdateForm from "../../components/updateForm/UpdateForm";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams} from "react-router-dom";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import { isAuthenticated } from "../../utils/authHelper";
import UpdatePasswordForm from "../../components/updatepasswordForm/UpdatePasswordForm";
import stBackground from "../../logos/stBackground.jpg" 


const Profile = () => {
  const { username } = useParams();
  const [numPosts, setNumPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  

  
  const toggleUpdateForm = () => {
    setShowUpdateForm((prevState) => {
      setShowUpdatePasswordForm(false); // Close password form when opening update form
      return !prevState;
    });
  };

  
  const toggleUpdatePasswordForm = () => {
    setShowUpdatePasswordForm((prevState) => {
      setShowUpdateForm(false); // Close update form when opening password form
      return !prevState;
    });
  };
  // ****End of Form toggles****

  const getTotalLikes = (posts) => {
    let totalLikes = 0;

    posts.forEach((post) => {
      totalLikes += post.likes.length;
    });

    return totalLikes;
  };

  // new auth stuff for Edit profile button
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
      // setBio(data.bio);
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
<div className="App">
<div
  className="Background"
  style={{
    backgroundImage: `url(${stBackground})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  }}
>
  
</div>

      <Header isAuthenticated={isUserAuthenticated} />

       <div className="AltLuckyguy">
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
                  {showUpdateForm && <UpdateForm userInfo={userInfo} getUser={getUser} />}
                  {showUpdatePasswordForm && (
                    <UpdatePasswordForm username={username} />
                  )}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default mustBeAuthenticated(Profile);
