import * as actionTypes from "../actions/user_actions";

const initialState = {
    username: "",
    description: "",
    totalLikes: 0,
    graduated: false,
    userPosts: [],
    likedPosts: [],
}

const userReducer = (state: any = initialState, action: any) => {


    switch(action.type){
        case actionTypes.TOTAL_LIKES:
            return{
              ...state,
              totalLikes: action.totalLikes,
            };   
    } 

    return state;
}


export default userReducer
