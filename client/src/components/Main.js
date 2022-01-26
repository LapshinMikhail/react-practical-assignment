import React, { useState} from 'react';
import Header from "./Header";
import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import Gallery from "./Gallery";
import Login from "./Login";
import CreatePost from "./AddPost";
import {getPosts, getUserName} from "../utils/utils";


const Main = () => {

    const userName = useSelector(getUserName);
    const posts = useSelector(getPosts);
    const [addingPost, isAddingPost] = useState(false);

    const addPostModalToggle = () => {
        isAddingPost(prev => !prev);
    }

    return (
        <div>
            <Header
                username={userName}
                addPostModalToggle={addPostModalToggle}
            />
            {addingPost &&
                <CreatePost
                    username={userName}
                    addPostModalToggle={addPostModalToggle}
                />}

            <Routes>
                <Route
                    path="/"
                    element={(userName ? <Gallery
                        username={userName}
                        posts={posts}
                    /> : <Login/>)}/>
            </Routes>
        </div>
    )
};

export default Main;