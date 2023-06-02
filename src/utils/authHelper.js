import md5 from 'md5'


export function generateAuthHeader(){
    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return { Authorization: `Bearer ${auth.token}` };
        }else{
            return {};
        }
        
    }
}

export function isAuthenticated(){

    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return true;
        }
        return false
      }

}
export function getUserName(){

    let auth = localStorage.getItem("auth")

    if(auth){
        auth = JSON.parse(auth)
        if(auth.token){
            return auth.username;
        }
        return false
      }

}

export function getUserGravatar(username) {

    let hash = md5(username)

    return "https://en.gravatar.com/avatar/" + hash +  "?d=mp"
}

// export function getUserLikes(){

//     let auth = localStorage.getItem("auth")

//     if(auth){
//         auth = JSON.parse(auth)
//         if(auth.token){
//             return auth.likes;
//         }
//         return false
//       }

// }

    