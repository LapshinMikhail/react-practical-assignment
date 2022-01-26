import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateCommentFetchAction} from "../redux/actions/commentsActions";
import {EDIT_COMMENT_INPUT_PLACEHOLDER_TEXT} from "../utils/constants";


const EditComment = ({comment,editCommentButtonHandler,updatedCommentRequestBodyGenerator}) => {

    const dispatch = useDispatch();

    const [text,setText] = useState("");
    useEffect(()=>{
        setText(comment.text);
    },[comment.text]);

    const commentBodyOnChangeHandler = useCallback((e)=>{
        setText(e.target.value)
    },[setText]);

    const saveCommentHandler = () => {
            if(text && text !== comment.text){
                const updatedComment = updatedCommentRequestBodyGenerator(text,comment.likes,comment.dislikes);
                dispatch(updateCommentFetchAction(comment.id,updatedComment));
                editCommentButtonHandler();
            }
    }

    return (
        <div>
            <input
                type="text"
                placeholder={EDIT_COMMENT_INPUT_PLACEHOLDER_TEXT}
                value={text}
                onChange={commentBodyOnChangeHandler}
            />
            <button onClick={saveCommentHandler}>Save</button>
            <button onClick={editCommentButtonHandler}>Cancel</button>
        </div>
    );
};

export default EditComment;