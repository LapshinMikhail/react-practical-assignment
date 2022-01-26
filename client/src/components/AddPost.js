import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {uploadPostAction} from "../redux/actions/postActions";
import {ADD_POST_INPUT_PLACEHOLDER} from "../utils/constants";


const CreatePost = ({username,addPostModalToggle}) => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const preview = useMemo(() => {
        if (image) {
            const src = URL.createObjectURL(image);
            return (<img style={{
                height: "150px",
                maxWidth: "100%",
            }} src={src} alt="postPhoto"/>);
        }
    }, [image]);

    const postCreator = (title, username) => {
        return {title, username};
    }

    const addPostHandler = useCallback(
        ()=>{
            if(title){
                const newPost = postCreator(title,username);
                let formData = new FormData();
                if(image) {
                    formData.append('picture',image);
                } else{
                    formData = null;
                }
                dispatch(uploadPostAction(newPost,formData));
                addPostModalToggle();
            }
        },[title,image, dispatch,addPostModalToggle,username]);

    const postTitleOnChangeHandler = useCallback((e)=>setTitle(e.target.value),[setTitle]);
    const imageInputOnChangeHandler = useCallback((e)=>setImage(e.target.files[0]),[setImage]);

    return (
        <div>
            <input
                type="text"
                placeholder={ADD_POST_INPUT_PLACEHOLDER}
                value={title}
                onChange={postTitleOnChangeHandler}
            />
            <input
                type="file"
                onChange={imageInputOnChangeHandler}
            />
            <button onClick={addPostHandler}>Add</button>
            <button onClick={addPostModalToggle}>Cancel</button>
            {preview}
        </div>
    );
};

export default CreatePost;