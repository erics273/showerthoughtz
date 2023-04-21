import moment from "moment";
import React, { useState, useEffect } from "react";
import { generateAuthHeader } from "../../utils/authHelper";
import { getUserName } from "../../utils/authHelper";

function Post(props) {

  let currentUserName = getUserName();
  console.log(currentUserName);
  let likes = props.thoughtshit.likes;
  let likeId = null;

  let likedPost = props.thoughtshit.likes.some(
    (like) => like.username === currentUserName
  );

  
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
  
  
  
  
  // **********************Handle unlike button click**********************

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
    // let currentUserName = getUserName();
    // console.log(currentUserName);
    // let likes = props.thoughtshit.likes;
    // let likeId = null;

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

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays <= 7) {
      return `${diffInDays} days ago`;
    } else {
      return formattedDate;
    }
  };


  return (
    <div className="Post">
      <div>
        <div>Username: {props.thoughtshit.username}</div>

        <div>Post: "{props.thoughtshit.text}"</div>

        <div>Time Created: {dateFormat(props.thoughtshit.createdAt)}</div>

        <div style={{ display: "inline-block" }}>
          <button onClick={handleLikeButton}>
            Likes:{props.thoughtshit.likes.length}
          </button>
        </div>
        <div style={{ display: "inline-block" }}>
        {likedPost && (
          <button onClick={handleUnlikeButtonClick}>Unlike</button>
     )}
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Post;

// 4/14
// Right now its diplaying the like and unlike button no matter what.
// We want it to display like regardless but only unlike button if post has been liked by user
// "conditional rendering" on unlike, diplaying and not displaying divs.
