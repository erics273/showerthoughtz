import { generateAuthHeader } from "../../utils/authHelper";
import React, { useState, useEffect } from 'react';




function PostFeed(props) {

    let [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
        console.log("cockmonster")
    }, []);


    let getPosts = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
            method: 'GET', //< By default, the method fetch uses is "GET" so you dont really need this. This is just here for education
            headers: {
                ...generateAuthHeader()

            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts(data)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }



    return (
        <div className="PostFeed">Hello from the Post Feed
            {posts.map((post) => {
                return(
                <div>
                    <div>{post.username}</div>
                    <br></br>
                    <div>{post.text}</div>
                </div>
                )
            })}

        </div>
    );
}

export default PostFeed;