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
        console.log("getPosts successful")
    }, []);


    let getPosts = async (event) => {

        try {
            let response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
                method: "GET",
                headers: {
                    ...generateAuthHeader(),
                },
            });
            console.log(response);

            let data = await response.json();
            data.reverse();
            setPosts(data);

            console.log("you got posts", data);


        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="Feed">
            <Header isAuthenticated={props.isAuthenticated} />
            <div className="container">
                <h2>Post Feed</h2>
                <PostForm getPostsProp={getPosts} />
                <PostFeed shitposts={posts} />
            </div>
        </div>
    );

}

export default mustBeAuthenticated(Feed);