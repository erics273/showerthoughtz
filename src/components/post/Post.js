// import moment from 'moment';

function Post(props) {

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

                <div>Likes: {props.thoughtshit.likes.length}</div>
            </div>

            <hr />
        </div>
    );
}

export default Post;

// 03/15/23  try to get it to display hpw many days ago a post was

























