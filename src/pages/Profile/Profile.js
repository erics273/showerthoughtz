// import React, { useEffect, useState } from "react";
// import {
//   getUserGravatar,
//   getUserLikes,
//   getUserName,
//   generateAuthHeader,
// } from "../../utils/authHelper";
// import Header from "../../components/header/Header";
// import UpdateForm from "../../components/updateForm/UpdateForm";
// import { Container, Row, Col, Image, Button } from "react-bootstrap";
// import { useParams, Link, useLocation } from "react-router-dom";

// const Profile = ({bio}) => {
//   // const history = useHistory();
//   const { username } = useParams();
//   const location = useLocation();
//   const [numPosts, setNumPosts] = useState([]);
//   const [numLikes, setNumLikes] = useState(0);
//   const gravatarUrlProfilePic = getUserGravatar(username);
//   const [bio, setBio] = useState("");
//   const [showUpdateForm, setShowUpdateForm] = useState(false);

//   // ********Getting specific users posts********

//   const toggleUpdateForm = () => {
//     setShowUpdateForm((prevState) => !prevState);
//   };

//   const getNumUserPosts = async (props) => {
//     try {
//       let response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/posts?username=${username}`,
//         {
//           headers: {
//             method: "GET",
//             "Content-Type": "application/json",
//             ...generateAuthHeader(),
//           },
//         }
//       );

//       console.log(response);

//       let data = await response.json();
//       setNumPosts(data);
//       // setBio(data.bio);

//       console.log("Here are " + username + " posts:", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const getUser = async () => {
//     try {
//       let response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/users/${username}`,
//         {
//           headers: {
//             method: "GET",
//             "Content-Type": "application/json",
//             ...generateAuthHeader(),
//           },
//         }
//       );

//       console.log(response);

//       let data = await response.json();
//       let userBio = data.bio;
//       let userFullname = data.fullName;
//       setBio(userBio); // Update the bio state with the user's bio
//       console.log("Here is the user fullname:", userFullname);
//       console.log("Here is the user bio:", userBio);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // ********Getting specific users likes********

//   useEffect(() => {
//     getNumUserPosts();
//     getUser();
//     // getUserBio(); // Fetch the user's bio
//     console.log("getNumUserPosts successful");
//   }, []);

//   // *** Calculate total likes ***
//   useEffect(() => {
//     let totalLikes = 0;

//     numPosts.forEach((post) => {
//       totalLikes += post.likes.length;
//     });

//     setNumLikes(totalLikes);
//   }, [numPosts]);

//   // ********************************

//   // console.log(gravatarUrlProfilePic);
//   console.log(username);
//   console.log("Likes:", numPosts);

//   return (
//     <>
//       <Header />

//       <div className="d-flex justify-content-center">
//         <Container className="mt-3" style={{ textAlign: "center" }}>
//           <Row>
//             <Col md={4}>
//               <Image
//                 src={gravatarUrlProfilePic}
//                 roundedCircle
//                 fluid
//                 style={{ width: "200px", height: "200px" }}
//               />
//             </Col>
//             <Col className="Luckyguy" md={8}>
//               <h2>{username}</h2>
//               <p>{bio}</p>
//               <p>Likes: {numLikes}</p>
//               <p>Posts: {numPosts.length}</p>
//               {location.pathname !== `/update/${username}` && (
//                 <Button onClick={toggleUpdateForm} variant="primary">
//                   Edit Profile
//                 </Button>
//               )}
//               {showUpdateForm && <UpdateForm username={username} />}
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Profile;

// // Need a Put request to update user
// // ability to change full name and bio.

// // conditional send password. (only send if if they filled out something)

// // Edit page shares similarities to the register page.

// // about is bio

// // *************************************

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

const Profile = () => {
  const { username } = useParams();
  const location = useLocation();
  const [numPosts, setNumPosts] = useState([]);
  const [numLikes, setNumLikes] = useState(0);
  const gravatarUrlProfilePic = getUserGravatar(username);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [userBio, setBio] = useState(""); 

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
  }, []);

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
            <Col className="Luckyguy" md={8}>
              <h2>{username}</h2>
              <p>{userBio}</p>
              <p>Likes: {numLikes}</p>
              <p>Posts: {numPosts.length}</p>
              {location.pathname !== `/update/${username}` && (
                <Button onClick={toggleUpdateForm} variant="primary">
                  Edit Profile
                </Button>
              )}
              {showUpdateForm && <UpdateForm username={username} setBio={setBio} />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
