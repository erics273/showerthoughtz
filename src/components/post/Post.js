// import moment from "moment";
// import React, { useState, useEffect } from "react";
// import { generateAuthHeader, getUserGravatar } from "../../utils/authHelper";
// import { getUserName } from "../../utils/authHelper";
// import { Card, Button, Fade } from "react-bootstrap";
// import md5 from "md5";
// import { useParams } from "react-router-dom";
// import { BsHandThumbsUp } from "react-icons/bs";
// import { Link } from 'react-router-dom';
// import Profile from "../../pages/Profile/Profile";

// function Post(props) {

//   const [showProfile, setShowProfile] = useState(false);
//   let gravatarUrl = getUserGravatar(props.thoughtshit.username);

//   // **********************Handle like button click**********************

//   let handleLikeButton = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/likes`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...generateAuthHeader(),
//           },
//           body: JSON.stringify({
//             postId: props.thoughtshit._id,
//           }),
//         }
//       );
//       if (response.status < 200 || response.status > 299) {
//         throw Error(response.statusText);
//       }
//       console.log("post liked");

//       // update liked state to true

//       props.getPostsProp();
//       // setLikedByCurrentUser(true);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   // **********************Handle unlike button click**********************

//   let handleUnlikeButtonClick = async (event) => {
//     event.preventDefault();
//     let currentUserName = getUserName();
//     console.log(currentUserName);
//     let likes = props.thoughtshit.likes;
//     let likeId = null;

//     for (let i = 0; i < likes.length; i++) {
//       if (likes[i].username === currentUserName) {
//         likeId = props.thoughtshit.likes[i]._id;

//         // console.log("liked by", likes[i].username);
//         // console.log("id:", likeId);
//         // console.log(likes[i])
//       }
//     }

//     if (!likeId) {
//       console.log("User has not liked this post");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/likes/${likeId}`,
//         {
//           method: "DELETE",
//           headers: {
//             ...generateAuthHeader(),
//           },
//         }
//       );
//       if (response.status < 200 || response.status > 299) {
//         throw Error(response.statusText);
//       } else {
//         console.log("post unliked");
//       }
//       props.getPostsProp();
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   // displaying date
//   let dateFormat = (postDate) => {
//     let theDate = new Date(postDate);
//     let theYear = theDate.getFullYear();
//     let theMonth = theDate.getMonth() + 1;
//     let theDay = theDate.getDate();

//     // displaying the hours and days
//     let currentTime = new Date();
//     let diffInMs = currentTime - theDate;
//     let diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
//     let diffInDays = Math.floor(diffInHours / 24);
//     let formattedDate = theMonth + "/" + theDay + "/" + theYear;

//     if (diffInHours >= 1 && diffInHours < 24) {
//       return `${diffInHours} hours ago`;
//     } else if (diffInHours < 1) {
//       return "Less than an hour ago";
//     } else if (diffInDays === 1) {
//       return "Yesterday";
//     } else if (diffInDays <= 7) {
//       return `${diffInDays} days ago`;
//     } else {
//       return formattedDate;
//     }
//   };

//   let likedPost = props.thoughtshit.likes.some(
//     (like) => like.username === getUserName()

//   );

//   const handleProfileClick = () => {
//     setShowProfile(!showProfile);
//     console.log("CHANGED")
//   }

//   return (

//     <Card className="mb-3">
//           <Card.Header style={{ backgroundColor: "wheat", fontFamily: "Luckiest Guy", fontSize: "20pt" }}>
//        {props.thoughtshit.username}
//        <Link to="/profile" onClick={handleProfileClick}>
//               <img style={{ marginLeft: 10, borderRadius: '50%' }} src={gravatarUrl} alt="Profile picture" />
//               </Link>
//       </Card.Header>
//       <Card.Body>
//         {/* the users post */}
//         <Card.Text style={{ fontWeight: "bold" }}>{props.thoughtshit.text}</Card.Text>
//         <Card.Text style={{opacity:0.5 }} >
//          {dateFormat(props.thoughtshit.createdAt)}
//         </Card.Text>
//         <div style={{ display: "inline-block" }}>
//           <Button
//             variant={likedPost ? "primary" : "secondary"}
//             onClick={likedPost ? handleUnlikeButtonClick : handleLikeButton}
//           >
//             <BsHandThumbsUp style={{ marginRight: '5px' }} />
//            {props.thoughtshit.likes.length}
//           </Button>
//         </div>
//       </Card.Body>
//            <Profile gravatarUrl={gravatarUrl} />
//       {/* {showProfile && <Profile gravatarUrl={gravatarUrl} username={props.thoughtshit.username} />} */}
//     </Card>

//   );

// }

// export default Post;

// *****Style*****

// **********************/
// Create a user profile page with the ability to update (edit profile)
// On accessible by logging in
// Use "create a user in the API"

import React, { useState } from "react";
import { generateAuthHeader, getUserGravatar, getUserName } from "../../utils/authHelper";
import { Card, Button } from "react-bootstrap";
import { BsHandThumbsUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import Profile from "../../pages/Profile/Profile";

function Post(props) {
  const [showProfile, setShowProfile] = useState(false);
  const gravatarUrl = getUserGravatar(props.thoughtshit.username);
  const likedPost = props.thoughtshit.likes.some(
    (like) => like.username === getUserName()
  );
  console.log(gravatarUrl)
  // console.log (gravatarUrl)
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
   
    console.log("CHANGED");
  };

  const handleLikeButton = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...generateAuthHeader(),
          },
          body: JSON.stringify({
            postId: props.thoughtshit._id,
          }),
        }
      );
      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      }
      console.log("post liked");

      props.getPostsProp();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUnlikeButtonClick = async (event) => {
    event.preventDefault();
    const currentUserName = getUserName();
    console.log(currentUserName);
    const likes = props.thoughtshit.likes;
    let likeId = null;

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].username === currentUserName) {
        likeId = likes[i]._id;
      }
    }

    if (!likeId) {
      console.log("User has not liked this post");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/likes/${likeId}`,
        {
          method: "DELETE",
          headers: {
            ...generateAuthHeader(),
          },
        }
      );
      if (response.status < 200 || response.status > 299) {
        throw Error(response.statusText);
      } else {
        console.log("post unliked");
      }
      props.getPostsProp();
    } catch (error) {
      console.error(error.message);
    }
  };

  const dateFormat = (postDate) => {
    const theDate = new Date(postDate);
    const theYear = theDate.getFullYear();
    const theMonth = theDate.getMonth() + 1;
    const theDay = theDate.getDate();
    const currentTime = new Date();
    const diffInMs = currentTime - theDate;
    const diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const formattedDate = `${theMonth}/${theDay}/${theYear}`;

    if (diffInHours >= 1 && diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 1) {
      return "Less than an hour ago";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays <= 7) {
      return `${diffInDays} days ago`;
    } else {
      return formattedDate;
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header
        style={{
          backgroundColor: "wheat",
          fontFamily: "Luckiest Guy",
          fontSize: "20pt",
        }}
      >
        {props.thoughtshit.username}

        <Link to={`/profile/${props.thoughtshit.username}`} onClick={handleProfileClick}>
          <img
            style={{ marginLeft: 10, borderRadius: "50%" }}
            // src={gravatarUrl}
            src={gravatarUrl} alt="Profile Picture"
          />
        </Link>
      </Card.Header>
      <Card.Body>
        <Card.Text style={{ fontWeight: "bold" }}>
          {props.thoughtshit.text}
        </Card.Text>
        <Card.Text style={{ opacity: 0.5 }}>
          {dateFormat(props.thoughtshit.createdAt)}
        </Card.Text>
        <div style={{ display: "inline-block" }}>
          <Button
            variant={likedPost ? "primary" : "secondary"}
            onClick={likedPost ? handleUnlikeButtonClick : handleLikeButton}
          >
            <BsHandThumbsUp style={{ marginRight: "5px" }} />
            {props.thoughtshit.likes.length}
          </Button>
        </div>
      </Card.Body>
      {showProfile && (
        <Profile
        gravatarUrl={gravatarUrl}
        username={props.thoughtshit.username}
          // username={props.thoughtshit.username}
        />
      )}
    </Card>
  );
}

export default Post;
