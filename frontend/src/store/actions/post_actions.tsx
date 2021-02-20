import axios from "axios";

export const AWAIT_DATA = "AWAIT_DATA";
export const DECREMENT = "DECREMENT";
export const ON_MOUNT = "ON_MOUNT";


export const onMount = (posts: string|number) => {
    return {
        type: ON_MOUNT,
        posts: posts,
    }
}

export const fetchPosts = () => {
    return (dispatch: any) => {
        axios.get("http://localhost:5000/posts").then((response) => {
        let posts: any = response.data;
        return posts;
        }).then((posts)=> dispatch(onMount(posts))).catch((err: any) => console.log(err));
    };
};

export const awaitData = () => {
    return {
        type: AWAIT_DATA,
    }
}

