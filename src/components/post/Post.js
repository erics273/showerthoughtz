import moment from "moment";
// import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from "react";
import { generateAuthHeader, getUserGravatar } from "../../utils/authHelper";
import { getUserName } from "../../utils/authHelper";
import { Card, Button, Fade } from "react-bootstrap";
import md5 from "md5";
import { useParams } from "react-router-dom";

function Post(props) {
  let gravatarUrl = getUserGravatar(props.thoughtshit.username);

  console.log("butts");
  console.log(gravatarUrl);

  // Like button
  // const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  // let checkIfLikedByCurrentUser = () => {
  //   let currentUserName = getUserName();
  //   let likes = props.thoughtshit.likes;

  //   for (let i = 0; i < likes.length; i++) {
  //     if (likes[i].username === currentUserName) {
  //       setLikedByCurrentUser(true);
  //     }
  //   }
  // }

  // **********************Handle like button click**********************

  let handleLikeButton = async (event) => {
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

      // update liked state to true

      props.getPostsProp();
      // setLikedByCurrentUser(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // **********************Handle unlike button click**********************

  let handleUnlikeButtonClick = async (event) => {
    event.preventDefault();
    let currentUserName = getUserName();
    console.log(currentUserName);
    let likes = props.thoughtshit.likes;
    let likeId = null;

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].username === currentUserName) {
        likeId = props.thoughtshit.likes[i]._id;

        // console.log("liked by", likes[i].username);
        // console.log("id:", likeId);
        // console.log(likes[i])
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

  // displaying date
  let dateFormat = (postDate) => {
    let theDate = new Date(postDate);
    let theYear = theDate.getFullYear();
    let theMonth = theDate.getMonth() + 1;
    let theDay = theDate.getDate();

    // displaying the hours and days
    let currentTime = new Date();
    let diffInMs = currentTime - theDate;
    let diffInHours = Math.floor(diffInMs / 1000 / 60 / 60);
    let diffInDays = Math.floor(diffInHours / 24);
    let formattedDate = theMonth + "/" + theDay + "/" + theYear;

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
  let likedPost = props.thoughtshit.likes.some(
    (like) => like.username === getUserName()
  );

  return (
    // <div className="Post">
    //     <div>
    //         <div>Username: {props.thoughtshit.username}</div>

    //         <div>Post: "{props.thoughtshit.text}"</div>

    //         <div>Time Created: {dateFormat(props.thoughtshit.createdAt)}</div>

    //         <div style={{ display: "inline-block" }}>
    //                 {/* ^^ This is an if else statement but easier, "?" is the if and ":" is the else ^^*/}
    //                 <Button variant={likedPost ? "primary" : "secondary"} onClick={likedPost ? handleUnlikeButtonClick : handleLikeButton}>

    //                 Likes:{props.thoughtshit.likes.length}
    //             </Button>
    //         </div>
    //         <div style={{ display: "inline-block" }}>
    //         </div>
    //     </div>

    //     <hr />
    // </div>

    <Card className="mb-3">
          <Card.Header style={{ backgroundColor: "wheat", fontFamily: "Luckiest Guy", fontSize: "20pt" }}>
       {props.thoughtshit.username}
              <img style={{ marginLeft: 10, borderRadius: '50%' }} src={gravatarUrl} alt="Profile picture" />
      </Card.Header>
      <Card.Body>
        {/* the users post */}
        <Card.Text style={{ fontWeight: "bold" }}>{props.thoughtshit.text}</Card.Text>
        <Card.Text style={{opacity:0.5 }} >
         {dateFormat(props.thoughtshit.createdAt)}
        </Card.Text>
        <div style={{ display: "inline-block" }}>
          <Button
            variant={likedPost ? "primary" : "secondary"}
            onClick={likedPost ? handleUnlikeButtonClick : handleLikeButton}
          >
            Likes:{props.thoughtshit.likes.length}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;

// *****Style*****
// Fix Like Button, add thumbs up icon
// fade the time format




// **********************/
// Create a user profile page with the ability to update (edit profile)
// On accessible by logging in 
// Use "create a user in the API"
