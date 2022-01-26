import React from 'react';
import Comment from "./Comment";

const CommentsList = ({comments,username}) => {
    return (
        <div>
            {comments && comments.map((comment)=>{
                return <Comment key={comment.id} comment={comment} username={username}/>
            })}
        </div>
    );
};

export default CommentsList;