import React, {useEffect, useState} from "react";
import { getUserGravatar, getUserLikes, getUserName } from "../../utils/authHelper";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import md5 from "md5";

const Profile = () => {
  const { username} = useParams();
 
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const profileUserName = getUserName(username);
  const numUserLikes = getUserLikes(numLikes)


  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/users/${username}/posts`);
      const data = await response.json();
  
      let totalLikes = 0;
  
      data.forEach((post) => {
        if (post.user === username && post.likes) {
          totalLikes += post.likes.length;
        }
      });
  
      setNumLikes(totalLikes);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  useEffect(() => {
    fetchLikes();
  }, [username]);

  console.log(username);
  console.log(gravatarUrlProfilePic);
  console.log(profileUserName);
  // console.log(fetchLikes)



  

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
              <p>Likes:{numLikes}</p>
              <Button variant="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;



// ********************

// 5/23


// Trying to get the total amount of likes for a user to display on their profile
