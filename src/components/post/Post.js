import React, { useState } from "react";

function Post(props) {

    let [likes, setLikes] = useState(props.thoughtshit.likes.length);



// Like button
    function handleLikeButton() {
        setLikes(likes + 1);
      }


    // displaying date
    let dateFormat = (postDate) => {
        let theDate = new Date(postDate);
        let theYear = theDate.getFullYear();
        let theMonth = theDate.getMonth() + 1;
        let theDay = theDate.getDate();


        // displaying the hours and days
        let currentTime = new Date();
        let diffInMs = currentTime - new Date(postDate);
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

                <button onClick={handleLikeButton}>Likes: {likes}</button>
            </div>

            <hr />
        </div>
    );
}

export default Post;



























