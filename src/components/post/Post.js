



function Post(props) {
    return (
        <div className="Post">

            <div >
                <div>Username: {props.thoughtshit.username}</div>

                <div>Post: "{props.thoughtshit.text}"</div>

                <div>Time Created: {props.thoughtshit.createdAt}</div>

                <div>Likes: {props.thoughtshit.likes.length}</div>

            </div>



        <hr/>
        </div>


    );
}

export default Post;

// 1/10/23

// Making sure new post display on post feed without reloading page. This is gonna require some reworking of the PostFeed and PostForm componets.
// We are gonna "lift state" wooooo

