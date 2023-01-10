import React, { Component } from "react";
import mustBeAuthenticated from "../../redux/hoc/mustBeAuthenticated";
import Header from "../../components/header/Header";
import PostForm from "../../components/postForm/PostForm";
import PostFeed from "../../components/postFeed/PostFeed";

class Feed extends Component {

    render() {
        return (
            <div className="Feed">
                <Header isAuthenticated={this.props.isAuthenticated} />
                <div className="container">
                    <h2>Post Feed</h2>
                    <PostForm  />
                    <PostFeed />
                </div>
            </div>
        );
    }
}

export default mustBeAuthenticated(Feed);