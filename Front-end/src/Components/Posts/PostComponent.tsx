import React, {useState, useEffect} from "react";
import './PostComponent_style.tsx';
import { PostWrapper } from "./PostComponent_style";
import axios from "axios";
import {connect} from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
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


export const PostComponent: React.FC<Props> = (Props) => {

//Get images
    let content = null;

    if (Props.filename?.includes("jpg")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + Props.filename} title="post content"/>
        );
    }
    else if (Props.filename?.includes("jpeg")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + Props.filename} title="post content"/>
        );
    }
    else if (Props.filename?.includes("png")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="img"
            src={"http://localhost:5000/posts/images/" + Props.filename} title="post content"/>
        );
    }
    else if (Props.filename?.includes("mov")){
        content = (
            <CardMedia 
            style={{ height: "800px", width: "600px" }}
            component="video"
            src={"http://localhost:5000/posts/images/" + Props.filename} title="post content" controls/>
            );
    };

//Delete posts
    // const deleteHandler = () => {
    //     axios.delete("http://localhost:5000/posts/delete/" + Props.id).then(()=>{
    //         console.log("image " + Props.id + " deleted");
    //     })

    //     axios.delete("http://localhost:5000/posts/image/delete/" + Props.filename);

    //     window.location.reload();
    // };

//Add Likes

    const [likes, addLike] = useState(0);
    const [postLiked, markPost] = useState(false);
   
    useEffect(() => {

        let initialLikes = likes;
        //load the likes of the post
        if(initialLikes === 0){
            axios.get("http://localhost:5000/posts/" + Props.id).then((res: any) => {
                let currentLikes = res.data.likes;
                addLike(likes + currentLikes);
            })
        }
        //check if user has liked this post before
        axios.get("http://localhost:5000/post/" + Props.id).then((res: any) => {
        })
    });




    interface likeData{
        id: String | undefined,
        likes: Number
    }

    const likeHandler = (updatedLikes: number) => {

        const Likes: likeData = {
            id: Props.id,
            likes: updatedLikes,
        }

        JSON.stringify(Likes);

        axios.post("http://localhost:5000/posts/like", Likes)
        .then(()=>{console.log("like added")})

        markPost(true);

    };

    const unlikeHandler = (updatedLikes: number) => {

        const Likes: likeData = {
            id: Props.id,
            likes: updatedLikes,
        }

        JSON.stringify(Likes);

        axios.post("http://localhost:5000/posts/like", Likes)
        .then(()=>{console.log("like added")})

        markPost(false);

    }



    return( 
        <PostWrapper>
             
            <Card className="post_container" id={Props.id} >

                <CardHeader className="cardheader" 
                    avatar={<Avatar aria-label="recipe" className="avatar"> U </Avatar>} 
                    action={<IconButton aria-label="settings"> <MoreVertIcon /> </IconButton>}
                    title={Props.username}/>
                    
                {/* Image or Video */}
                {content}

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

                <CardContent className="CardContent">{Props.description}</CardContent>

            </Card>
        </PostWrapper>
    )

}

const mapStateToProps = (state: any) => {
    return{
        posts: state.posts.posts,
    }
}

export default connect(mapStateToProps)(PostComponent);

