import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {updatePostFetchAction, uploadPostPictureAction} from "../redux/actions/postActions";

const EditPost = ({post, editModalToggle}) => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(post.title);
    }, [post.title]);

    const postTitleOnChangeHandler = useCallback((e) => setTitle(e.target.value), [setTitle]);
    const imageInputOnChangeHandler = useCallback((e)=>setImage(e.target.files[0]),[setImage]);

    const saveUpdatedPostHandler = useCallback(() => {
        if(image) {
            let formData = new FormData();
            formData.append('picture',image);
            dispatch(uploadPostPictureAction(post.id,formData,true));
        }
        if (title && title !== post.title) {
            dispatch(updatePostFetchAction(post.id, {title}));
        }
        editModalToggle();
    }, [title, post, dispatch, editModalToggle,image]);

    const previewNewImage = useMemo(() => {
        if (image) {
            const src = URL.createObjectURL(image);
            return (<img style={{
                height: "150px",
                maxWidth: "100%",
            }} src={src} alt="postPhoto"/>);
        }
    }, [image]);

    return (
        <div>
            {previewNewImage}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={postTitleOnChangeHandler}/>
            <input
                type="file"
                onChange={imageInputOnChangeHandler}
            />
            <button onClick={saveUpdatedPostHandler}>Save</button>
            <button onClick={editModalToggle}>Cancel</button>
        </div>
    );
};

export default EditPost;