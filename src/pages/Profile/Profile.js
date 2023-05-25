import React, {useEffect, useState} from "react";
import { getUserGravatar, getUserLikes, getUserName, generateAuthHeader } from "../../utils/authHelper";
import Header from "../../components/header/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import md5 from "md5";

const Profile = () => {
  const { username} = useParams();
 
  const [numLikes, setNumLikes] = useState([]);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const profileUserName = getUserName(username);
  


  const getNumUserLikes = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          ...generateAuthHeader(),
        },
      });
  
      console.log(response);
  
      let data = await response.json();
      data.reverse();
      setNumLikes(data);
  
      console.log("You got posts:", data);
  
      const username = profileUserName
      const totalLikes = data.reduce((count, post) => {
        if (post.user === username && post.likes) {
          return count + post.likes.length;
        }
        return count;
      }, 0);
  
      console.log("Total likes:", totalLikes);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect(() => {
    getNumUserLikes();
    console.log("getNumUserLikes successful");
  }, []);
  

  
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
              <p>Likes:{getNumUserLikes}</p>
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
