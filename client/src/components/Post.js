import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import CommentsList from "./CommentsList";
import EditPost from "./EditPost";
import AddComment from "./AddComment";
import {deletePostFetchAction, updatePostFetchAction} from "../redux/actions/postActions";
import "../css/post.css";

const Post = ({post,username}) => {

    const dispatch = useDispatch();

    const [editingPost, isEditingPost] = useState(false);
    const [commenting,isCommenting] = useState(false);
    const [showComments,setShowComments] = useState(false);

    const editModalToggle = () => {
        isEditingPost(prev => !prev);
    }

    const addCommModalToggle = () => {
        isCommenting(prev=>!prev);
    }

    const commentListToggle = () => {
        setShowComments(prev=>!prev);
    }

    const deletePostHandler = () => {
        dispatch(deletePostFetchAction(post.id));
    }


    const voteHandler = useCallback( (like) => {
        if(like){
            const likes = [...post.likes,username];
            dispatch(updatePostFetchAction(post.id, {likes}));
        } else {
            const dislikes = [...post.dislikes,username];
            dispatch(updatePostFetchAction(post.id, {dislikes}));
        }
    },[dispatch, post.dislikes, post.id, post.likes, username]);

    const isVoted = useCallback(() => {
        return post.likes.includes(username) || post.dislikes.includes(username);
    },[post.dislikes, post.likes, username]);

    const preview = useMemo(() => {
        if (post.imageSrc) {
            return (<img style={{
                height: "150px",
                maxWidth: "100%",
                margin:"10px"
            }} src={post.imageSrc} alt="postPhoto"/>);
        }
    }, [post.imageSrc]);

        return (
        <div className="post">
            {editingPost &&
                <EditPost
                    post={post}
                    editModalToggle={editModalToggle}
                />}
            <div className="postbody-block">
                {preview}
                <h3>{post.title}</h3>
                <p>Author: {post.username}, Posted {new Date(parseInt(post.date)).toLocaleDateString()} at {new Date(parseInt(post.date)).toLocaleTimeString()}</p>
                <p>Likes: {post.likes.length} Dislikes: {post.dislikes.length}</p>
            </div>
            <div className="buttons-block">
                <div>
                    <button
                        disabled={isVoted()}
                        onClick={()=>voteHandler(true)}>Like</button>
                    <button
                        disabled={isVoted()}
                        onClick={()=>voteHandler(false)}>Dislike</button>
                </div>
                <button
                    onClick={addCommModalToggle}
                >Add Comment</button>
                <button
                    disabled={username!==post.username}
                    onClick={editModalToggle}
                >Edit Post</button>
                <button
                    disabled={username!==post.username}
                    onClick={deletePostHandler}>Delete Post</button>
                <button
                    onClick={commentListToggle}>Comments</button>
                {commenting &&
                    <AddComment
                        postId={post.id}
                        username={username}
                        openAddComModalHandler={addCommModalToggle}
                    />}
                {showComments && <CommentsList comments={post.comments} username={username}/>}

            </div>

        </div>
    );
};

export default Post;