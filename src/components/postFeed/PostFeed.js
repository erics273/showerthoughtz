import { generateAuthHeader } from "../../utils/authHelper";
import React, { useState, useEffect } from 'react';
import Post from "../post/Post";


function PostFeed(props) {




    return (
        <div className="PostFeed">
            {props.shitposts.map((post) => {
                return (
                    <Post thoughtshit={post} key={post._id} getPostsProp={props.getPostsProp} />
                )
            })}

        </div>
    );
}

export default PostFeed;