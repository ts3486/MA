import * as actionTypes from "../actions/post_actions"

const initialState = {
    posts: [],
    //check if data is loaded or not
    data: false
};


const postsReducer = (state: any = initialState, action: any) => {


    switch(action.type){
        case actionTypes.AWAIT_DATA:
            return{
              ...state,
              data: true
            };

        case actionTypes.ON_MOUNT:
            return {
                //use the ... spread operator to spread and copy the current state
                ...state,
                //to update an array, use concat to 
                posts: state.posts.concat(action.posts),
            };
            
    } 

    return state;
}


export default postsReducer
