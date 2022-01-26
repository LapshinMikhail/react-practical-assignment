import {MAIN_URL} from "./mainActions";

export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const addPostAction = (newPost) => ({
    type: ADD_POST,
    payload: newPost
})

export const deletePostAction = (id) => ({
    type: DELETE_POST,
    payload: id
})

export const updatePostAction = (updatedPost) => ({
    type: UPDATE_POST,
    payload: updatedPost
})


export const uploadPostPictureAction = (id, image, isPhotoChanging) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/" + id + "/picture", {
            method: "POST",
            body: image
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                if (!isPhotoChanging) {
                    dispatch(updatePostAction(res.result));
                }
            })
    }
}

export const updatePostFetchAction = (id, updatedPost) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(updatePostAction(res.result));
            })
    }
}

export const deletePostFetchAction = (id) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/" + id, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(res => {
                dispatch(deletePostAction(res.result.id));
            })
    }
}

export const uploadPostAction = (newPost, image) => {
    return (dispatch) => {
        fetch(MAIN_URL + "post/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status.toString());
                }
            })
            .then(post => {
                dispatch(addPostAction(post.result));
                if (image) {
                    dispatch(uploadPostPictureAction(post.result.id, image,false));
                }
            })

    }
}