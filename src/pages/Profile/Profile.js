import React, { useEffect, useState } from "react";
import { getUserGravatar, getUserLikes, getUserName, generateAuthHeader,} from "../../utils/authHelper";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Update from "../../pages/Update/Update.js";

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const [numPosts, setNumPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const [bio, setBio] = useState("");

  // ********Getting specific users posts********

  const getNumUserPosts = async (props) => {
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

      console.log(response);

      let data = await response.json();
      setNumPosts(data);
      // setBio(data.bio);

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

      console.log(response);

      let data = await response.json();
      let userBio = data.bio;
      setBio(userBio); // Update the bio state with the user's bio
      console.log("Here is the user bio:", userBio);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ********Getting specific users likes********

  useEffect(() => {
    getNumUserPosts();
    getUser();
    // getUserBio(); // Fetch the user's bio
    console.log("getNumUserPosts successful");
  }, []);

  // *** Calculate total likes ***
  useEffect(() => {
    let totalLikes = 0;

    numPosts.forEach((post) => {
      totalLikes += post.likes.length;
    });

    setNumLikes(totalLikes);
  }, [numPosts]);

  // ********************************

  // console.log(gravatarUrlProfilePic);
  console.log(username);
  console.log("Likes:", numPosts);

  return (
    <>
      <Header />
      {/* <Users /> */}

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
              <h2>{username}</h2>
              <p>{bio}</p>
              <p>Likes: {numLikes}</p>
              <p>Posts: {numPosts.length}</p>
              <Button as={Link} to={`/update/${username}`} variant="primary">
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;

// Need a Put request to update user
// ability to change full name and bio.

// conditional send password. (only send if if they filled out something)

// Edit page shares similarities to the register page.

// about is bio
