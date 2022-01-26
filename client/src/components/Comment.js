import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import EditComment from "./EditComment";
import {deleteCommentFetchAction, updateCommentFetchAction} from "../redux/actions/commentsActions";

const Comment = ({comment, username}) => {

    const [editing,isEditing] = useState(false);

    const dispatch = useDispatch();

    const isVoted = useCallback(() => {
        return comment.likes.includes(username) || comment.dislikes.includes(username)
    },[comment.dislikes, comment.likes, username]);

    const updatedCommentRequestBodyGenerator = (text, likes, dislikes) => {
        return {text, likes, dislikes};
    }

    const voteHandler = useCallback((like) => {
        const likes = [...comment.likes];
        const dislikes = [...comment.dislikes];
        like ? likes.push(username) : dislikes.push(username);
        const updatedComment = updatedCommentRequestBodyGenerator(comment.text, likes, dislikes);
        dispatch(updateCommentFetchAction(comment.id, updatedComment));
    }, [comment.likes, comment.dislikes, comment.text, comment.id, username, dispatch]);

    const editCommentButtonHandler = () => {
        isEditing(prev=>!prev);
    }

    const deleteCommentHandler = () => {
        dispatch(deleteCommentFetchAction(comment.id))
    }


    return (
        <div style={{margin:"10px"}}>
            <div>
                <h3>Comment: {comment.text}</h3>
                <h5>Author: {comment.username} Posted {new Date(parseInt(comment.date)).toLocaleDateString()} at {new Date(parseInt(comment.date)).toLocaleTimeString()}</h5>
                <h5>Likes: {comment.likes.length} Dislikes: {comment.dislikes.length}</h5>
            </div>
            <div>
                <button
                    disabled={isVoted()}
                    onClick={() => voteHandler(true)}>Like
                </button>
                <button
                    disabled={isVoted()}
                    onClick={() => voteHandler(false)}>Dislike
                </button>
                <button
                    disabled={username !== comment.username}
                    onClick={editCommentButtonHandler}
                >Edit Comment
                </button>
                <button disabled={username !== comment.username} onClick={deleteCommentHandler}>Delete Comment</button>
            </div>
            {editing && <EditComment
                comment={comment}
                editCommentButtonHandler={editCommentButtonHandler}
                updatedCommentRequestBodyGenerator={updatedCommentRequestBodyGenerator}
            />}
        </div>
    );
};

export default Comment;