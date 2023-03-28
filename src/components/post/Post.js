import moment from 'moment'
// import React, { useState, useEffect } from 'react';
import { generateAuthHeader } from "../../utils/authHelper";



function Post(props) {

    // let [likes, setLikes] = useState(props.thoughtshit.likes.length);

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
                    body: JSON.stringify(
                        {
                            postId: props.thoughtshit._id

                        }
                    ),
                }
            );
            if (response.status < 200 || response.status > 299) {
                throw Error(response.statusText);
                
            }
            props.getPostsProp();
        } catch (error) {
            console.error(error.message);
        }
    }

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

                <div><button onClick={handleLikeButton}>Likes:{props.thoughtshit.likes.length}</button></div>
            </div>

            <hr />
        </div>
    );
}

export default Post;

// 03/15/23  try to get it to display hpw many days ago a post was