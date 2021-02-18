import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {useParams} from "react-router";
import axios from "axios";
// import postsReducer from "../../store/reducers/postsReducer";
import {ProfileWrapper} from "./ProfileCompoent_style";
import {Avatar, Button} from "@material-ui/core";

interface Props {
    username?: any;
    description?: string;
    posts?: any;
}


export const ProfileComponent: React.FC<Props> = (props: any) => {

    let {username} = useParams<any>();

    const [userName, setUsername] = useState(username);
    const [description, setDescription] = useState("");
    const [modalIsOpen, setModalState] = useState(false);
    const [modal2IsOpen, setModal2State] = useState(false);
    const [image, setImage] = useState(null);
    const [filename, setFilename] = useState(null);



    //Fetch user profile data
    useEffect(() => {

        const fetchUserData = () => {
            axios.get("http://localhost:5000/users/profile/" + username).then((res: any) => {
                   
            
                setUsername(res.data.username);
                setDescription(res.data.description);
                setFilename(res.data.filename);

            })
        };

        fetchUserData();
        console.log(userName, description, filename);

        //Graduation Function
        if(props.totalLikes >= 2){
            setModal2State(true);
        }
    }, [props.totalLikes, username,userName, description, filename])

    //Filter Posts
    const userPosts = props.posts.filter((post: any) => post.username ===  username)

    //Profile Update
    const profileData = {
        newUsername: userName,
        description: description,
        filename: filename,
    }

    const imageData: any = new FormData();

    imageData.append("image", image)
    
    const setProfile = () => {
        //Update User Info
        axios.post("http://localhost:5000/users/profile/update/" + username, profileData).then((err:any) => (console.log("profile updated!")));
        //Update username of all user posts
        axios.post("http://localhost:5000/posts/update/username/" + username, profileData).then((err:any) => (console.log("user posts updated!")));;

        axios.post("http://localhost:5000/posts/add/image", imageData).then(res => {
            console.log("profile pic updated!!");
        }).catch( error => console.log(error))

        //reload with new username;
        // window.location.replace("http://localhost:3000/profile/" + profileData.newUsername);
    }

   

    return(
    
    <ProfileWrapper>
        <div className="container">

            <div className="card">
                {filename ?
                <Avatar src={"http://localhost:5000/posts/images/" + filename}>U</Avatar>
                :
                <Avatar>U</Avatar>
                }         
                <h2 className="username">{userName}</h2>
                <div className="likes">{props.totalLikes}</div>
                <div className="description"> {description}</div>
                <Button className="descButton" variant="contained" color="default" onClick={(e) => setModalState(true)}>Edit Profile</Button>
                

                {/* Edit Profile Modal */}
                <Modal　isOpen={modalIsOpen} onRequestClose={() => setModalState(false)} ariaHideApp={false}>
                    <form className="form">
                        <label>Profile Image:</label>
                        <input
                        type="file"
                        name="image"
                        id="input"
                        formEncType="multipart/form-data"
                        onChange={(e: any) => {setImage(e.target.files[0]); setFilename(e.target.files[0].name); }}
                        required
                        /><br /><br />

                        <label>Username:</label>
                            <input
                            type="text"
                            name="username"
                            id="input"
                            value={userName}
                            onChange={(e)=> setUsername(e.target.value)}
                            required
                            /><br /><br />
                        
                        <label>Description:</label>
                            <input
                            type="text"
                            name="description"
                            id="input"
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            required
                            /><br /><br />
                        
                        <Button id="submit" type="button" variant="contained" color="primary" onClick={(e) => {setModalState(false); setProfile();}}>Submit</Button>    
                    </form>
                </Modal>

                <div className="posts-container">
                    {userPosts.map((post: any) => {

                        let content = null; 

                        if (post.filename?.includes("jpg")){
                                content = (<img key={post.filename} className="image" src={"http://localhost:5000/posts/images/" + post.filename} alt="is it here"></img>);
                            }
                         else if (post.filename?.includes("jpeg")){
                                content = (<img key={post.filename} className="image" src={"http://localhost:5000/posts/images/" + post.filename} alt="is it here"></img>);
                            }
                        else if (post.filename?.includes("png")){
                                content = (<img key={post.filename} className="image" src={"http://localhost:5000/posts/images/" + post.filename} alt="is it here"></img>);
                            }
                        else if (post.filename?.includes("mov")){
                                 content = (<video key={post.filename} className="image" src={"http://localhost:5000/posts/images/" + post.filename} controls></video>);
                            };    
    
                        return content;       
                    })}
                </div>
            </div>

            <Modal isOpen={modal2IsOpen} onRequestClose={() => setModal2State(false)} ariaHideApp={false}>
                <h1> Congratulations!!!</h1>
                <div>You have successfully reached # followers and # likes!!</div>
                <div>Now is the time to solidify your fanbase in other platforms</div>
            </Modal>
        </div>
    </ProfileWrapper>

    );
};

const mapStateToProps = (state: any) => {
    return{
    posts: state.posts.posts,
    user: state.auth.user,
    totalLikes: state.user.totalLikes,
    }
}

export default connect(mapStateToProps)(ProfileComponent);

//problem is that the props loaded rn are the entire posts, although i want to filter only the users posts.