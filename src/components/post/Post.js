



function Post(props) {


    let dateFormat =(postDate) =>{

       let theDate = new Date(postDate);
       let theYear = theDate.getFullYear();
        let theMonth = theDate.getMonth() + 1;
        let theDay = theDate.getDate();

        let formattedDate = theMonth + "/" + theDay + "/" + theYear

        return formattedDate


        

            
    }
    return (
        <div className="Post">

            <div >
                <div>Username: {props.thoughtshit.username}</div>

                <div>Post: "{props.thoughtshit.text}"</div>

                <div>Time Created: {dateFormat(props.thoughtshit.createdAt)}</div>

                <div>Likes: {props.thoughtshit.likes.length}</div>

            </div>



        <hr/>
        </div>


    );
}

export default Post;

// 03/15/23  try to get it to display hpw many days ago a post was


