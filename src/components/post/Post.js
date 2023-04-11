import moment from "moment";
// import React, { useState, useEffect } from 'react';
import { generateAuthHeader } from "../../utils/authHelper";
import { getUserName } from "../../utils/authHelper";

function Post(props) {
  // Like button

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

      props.getPostsProp();
    } catch (error) {
      console.error(error.message);
    }
  };

  // handling Unlike

  // let handleUnlikeButtonClick = async (event) => {
  //     event.preventDefault();
  // let likeId = props.thoughtshit.likes[props.thoughtshit.likes.length - 1]._id;
  //     try {
  //       let response = await fetch(
  //         `${process.env.REACT_APP_API_URL}/api/likes/${likeId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             "Content-Type": "application/json",
  //             ...generateAuthHeader(),
  //           },

  //         }

  //       );

  //       if (response.status < 200 || response.status > 299) {
  //         throw Error(response.statusText);
  //       }else {
  //         console.log("post unliked")
  //       }
  //       props.getPostsProp();
  //      } catch (error) {
  //         console.error(error.message);
  //     }

  //     }

  //     // ********************************************************************

//   let handleUnlikeButtonClick = async (event) => {
//     event.preventDefault();
//     let currentUserName = getUserName();
//     let likes = props.thoughtshit.likes;


//     for (let i = 0; i < likes.length; i++) {
//       if (likes[i].likedBy === currentUserName) {
        

//         let likeId = props.thoughtshit.likes[i]._id;

//         console.log("liked by", likes[i].username);
//         console.log("liked by", likeId);

//       }
    
//     }

    


//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/api/likes/${likeId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
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


let handleUnlikeButtonClick = async (event) => {
    event.preventDefault();

    let currentUserName = getUserName();
    let likes = props.thoughtshit.likes;

    // Filter likes to only keep those made by the current user
    let currentUserLikes = likes.filter((like) => like.likedBy === currentUserName);

    // reverse order to get the most recent like from the current user
    // let sortedCurrentUserLikes = currentUserLikes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(currentUserLikes)


    if (currentUserLikes.length > 0) {
        // Get the most recent like object
        let lastLike = currentUserLikes[0];

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/likes/${lastLike}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
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
    } else {
        console.log("This post was not liked by the current user.");
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
          <button onClick={handleUnlikeButtonClick}>Unlike</button>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Post;
