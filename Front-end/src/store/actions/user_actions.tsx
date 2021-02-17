import axios from "axios";

export const TOTAL_LIKES = "TOTAL_LIKES";

export const countTotalLikes = (username: string) => {
    return (dispatch: any) => {
        axios.get("http://localhost:5000/posts").then((response) => {
        
        let posts: any = response.data;
        console.log(posts);
     
        let userPosts = posts.filter((post: any) => {
            return post.username = username;
        })

        // console.log(userPosts);

        let totalLikes = 0; 

        userPosts.forEach((post: any) => {
            totalLikes += Number(post.likes);
            //is post.likes a number
            return totalLikes
        })
        
        return totalLikes;
        // console.log(totalLikes);

        }).then((totalLikes)=> {
            dispatch({
                type: TOTAL_LIKES,
                totalLikes: totalLikes,
            })
        })
        // .catch((err:any) => {console.log(err)});
    };
}
