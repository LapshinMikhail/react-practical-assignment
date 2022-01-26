import {LOGIN, LOGOUT, SET_PAGE, SET_PAGE_INFO} from "./actions/mainActions";
import {ADD_POST, DELETE_POST, UPDATE_POST} from "./actions/postActions";
import {ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT} from "./actions/commentsActions";

const initialState = {
    user: "",
    posts: [],
    pageInfo:{}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload};
        case LOGOUT:
            return {...state, user: initialState.user};
        case ADD_POST:
            return {...state, posts: [...state.posts, action.payload]}
        case DELETE_POST:
            return {...state, posts: [...state.posts.filter(post => post.id !== action.payload)]};
        case UPDATE_POST:
            let postIndex = state.posts.findIndex(post => post.id === action.payload.id);
            let posts = state.posts;
            posts[postIndex] = action.payload;
            return {...state, posts: [...posts]};
        case ADD_COMMENT:
            const tempPosts = [...state.posts];
            const post = tempPosts.find(post => post.id === action.payload.postId);
            post.comments.push(action.payload);
            return {...state, posts: tempPosts};
        case DELETE_COMMENT:
            const tempPostsArr = [...state.posts];
            const tempPost = tempPostsArr.find(post => post.id === action.payload.postId);
            tempPost.comments = tempPost.comments.filter(com=>com.id !== action.payload.id);
            return {...state, posts: tempPostsArr};
        case UPDATE_COMMENT:
            const tempPArr = [...state.posts];
            const tempP = tempPArr.find(post => post.id === action.payload.postId);
            const commentIndex = tempP.comments.findIndex(comments => comments.id === action.payload.id);
            tempP.comments[commentIndex] = action.payload;
            return {...state, posts: tempPArr};
        case SET_PAGE:
            return {...state, posts: action.payload};
        case SET_PAGE_INFO:
            return {...state,pageInfo: action.payload};
        default:
            return state;
    }
}