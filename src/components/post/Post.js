



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

