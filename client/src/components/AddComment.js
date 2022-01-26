import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {uploadCommentAction} from "../redux/actions/commentsActions";
import {ADD_COMMENT_PLACEHOLDER_TEXT} from "../utils/constants";


const AddComment = ({postId,username,openAddComModalHandler}) => {

    const [text,setText] = useState("");

    const dispatch = useDispatch();

    const commentBodyOnChangeHandler = useCallback((e)=>setText(e.target.value),[setText]);

    const commentGenerator = (text,postId,username) => {
        return {text,postId,username};
    }

    const addCommentHandler = useCallback(()=>{
        if(text){
            let newComment = commentGenerator(text,postId,username);
            dispatch(uploadCommentAction(newComment));
            openAddComModalHandler();
        }
    },[dispatch, openAddComModalHandler, postId, text, username]);

    return (
        <div>
            <input
                type="text"
                placeholder={ADD_COMMENT_PLACEHOLDER_TEXT}
                value={text}
                onChange={commentBodyOnChangeHandler}
            />
            <button onClick={addCommentHandler}>Add</button>
            <button onClick={openAddComModalHandler}>Cancel</button>
        </div>
    );
};

export default AddComment;