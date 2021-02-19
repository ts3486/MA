import React, {useState, useEffect} from "react";
import './PostComponent_style.tsx';
import { PostWrapper } from "./PostComponent_style";
import axios from "axios";
import {connect} from "react-redux";
import {Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';


interface Props {
    id?: string;
    username?: string;
    filename?: string;
    description?: string;
    likes?: number;
    imageId?: string;

}


export const PostComponent: React.FC<Props> = (props: any) => {

//Get images
    let content = null;

    if (props.filename?.includes("jpg")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + props.filename} title="post content"/>
        );
    }
    else if (props.filename?.includes("jpeg")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + props.filename} title="post content"/>
        );
    }
    else if (props.filename?.includes("png")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + props.filename} title="post content"/>
        );
    }
    else if (props.filename?.includes("mov")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="video"
            src={"http://localhost:5000/posts/images/" + props.filename} title="post content" controls/>
            );
    };

//Delete posts
    // const deleteHandler = () => {
    //     axios.delete("http://localhost:5000/posts/delete/" + props.id).then(()=>{
    //         console.log("image " + props.id + " deleted");
    //     })

    //     axios.delete("http://localhost:5000/posts/image/delete/" + props.filename);

    //     window.location.reload();
    // };

    // const [username, setUsername] = useState();
    const [filename, setFilename] = useState();



    const [likes, addLike] = useState(0);
    const [postLiked, markPost] = useState(false);
    
   
    useEffect(() => {

        let initialLikes = likes;
        //load the likes of the post
        if(initialLikes === 0){
            axios.get("http://localhost:5000/posts/" + props.id).then((res: any) => {
                let currentLikes = res.data.likes;
                addLike(likes + currentLikes);

                if(res.data.likedBy.includes(props.user.username)){
                    markPost(true);
                }
            })
        }
        //check if user has liked this post before

        //1. Add post id to user profile everytime a post is liked. OR 2. add likedUsers to the post document. 
        // axios.get("http://localhost:5000/posts/" + props.id).then((res: any) => {
        // })

        const fetchUserData = () => {
            axios.get("http://localhost:5000/users/profile/" + props.username).then((res: any) => {

                setFilename(res.data.filename);

            })
        };

        fetchUserData();
    });




    interface likeData{
        id: String | undefined,
        likes: Number
        likedBy: String [];
    }

    const likeHandler = (updatedLikes: number) => {

        const Likes: likeData = {
            id: props.id,
            likes: updatedLikes,
            likedBy: props.user.username,
        }

        JSON.stringify(Likes);

        axios.post("http://localhost:5000/posts/like", Likes)
        .then(()=>{console.log("like added")})

        markPost(true);

    };

    const unlikeHandler = (updatedLikes: number) => {

        const Likes: likeData = {
            id: props.id,
            likes: updatedLikes,
            likedBy: props.user.username
        }

        JSON.stringify(Likes);

        axios.post("http://localhost:5000/posts/like", Likes)
        .then(()=>{console.log("like added")})

        markPost(false);

    }



    return( 
        <PostWrapper>
             
            <Card className="post_container" id={props.id} >

                <CardHeader className="cardheader" 
                    avatar={<Avatar aria-label="recipe" className="avatar" src={"http://localhost:5000/posts/images/" + filename}> U </Avatar>} 
                    action={<IconButton aria-label="settings"> <MoreVertIcon /> </IconButton>}
                    title={props.username}/>
                    
                {/* Image or Video */}
                {content}

                {/* {props.isAuthenticated ?  */}
                <CardActions className="CardActions">
                    {postLiked ? 
                    <div className="actionIcons">
                    <FavoriteIcon className="likes" onClick={() => {addLike(likes - 1); unlikeHandler(likes - 1);}}/> <div className="likeNumber">: {likes}</div>
                    </div>
                    :
                    <div>
                    <FavoriteBorderIcon className="likes" onClick={() => {addLike(likes + 1); likeHandler(likes + 1);}}/> <div className="likeNumber">: {likes}</div>
                    </div>
                    }               
                    {/* You use the empty function to not pass the event to the function. instead it`s just a trigger to activate the function */}
                    {/* <DeleteIcon className="button" onClick={deleteHandler}/> */}
                </CardActions>
                {/* : null  }             */}

                <CardContent className="CardContent">{props.description}</CardContent>

            </Card>
        </PostWrapper>
    )

}

const mapStateToProps = (state: any) => {
    return{
        posts: state.posts.posts,
        user: state.auth.user,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(PostComponent);

