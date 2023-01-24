import React, { useState, useEffect } from "react";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import Header from "../../components/header/Header";
import PostForm from "../../components/postForm/PostForm";
import PostFeed from "../../components/postFeed/PostFeed";
import { generateAuthHeader } from "../../utils/authHelper";



function Feed(props) {

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

                //reverse the posts so that the newest post is first in the array
                data.reverse()

                setPosts(data)
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <div className="Feed">
            <Header isAuthenticated={props.isAuthenticated} />
            <div className="container">
                <h2>Post Feed</h2>
                <PostForm getPostsProp={getPosts}/>
                <PostFeed shitposts={posts}/>
            </div>
        </div>
    );

}

export default mustBeAuthenticated(Feed);