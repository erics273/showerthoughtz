
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
 const numLikes= props.thoughtshit.likes

  console.log(gravatarUrl)
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    console.log("CHANGED");
    console.log(numLikes.length)
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
            src={gravatarUrl} alt="Profile Picture"
          />
        </Link>
      </Card.Header>
      <Card.Body >
        <Card.Text  className="Luckyguy" style={{ fontSize:"120%", }}>
          {props.thoughtshit.text}
        </Card.Text>
        <Card.Text>
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
        // numLikes={props.thoughtshit.likes}
        />
      )}
    </Card>
  );
}

export default Post;


