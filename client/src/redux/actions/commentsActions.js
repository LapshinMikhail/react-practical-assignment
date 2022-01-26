import {MAIN_URL} from "./mainActions";

export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const addCommentAction = (newComment) => ({
    type: ADD_COMMENT,
    payload: newComment
})

export const deleteCommentAction = (id) => ({
    type: DELETE_COMMENT,
    payload: id
})

export const updateCommentAction = (updatedComment) => ({
    type: UPDATE_COMMENT,
    payload: updatedComment
})

export const updateCommentFetchAction = (id, updatedComment) => {
    return (dispatch) => {
        fetch(MAIN_URL + "comment/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedComment)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(updateCommentAction(res.result));
            })
    }
}

export const deleteCommentFetchAction = (id) => {
    return (dispatch) => {
        fetch(MAIN_URL + "comment/" + id, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(deleteCommentAction(res.result));
            })
    }
}

export const uploadCommentAction = (newComment) => {
    return (dispatch) => {
        fetch(MAIN_URL + "comment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(comment => {
                dispatch(addCommentAction(comment.result));
            })
    }
}

