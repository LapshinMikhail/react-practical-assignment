import React from 'react';
import {useDispatch} from "react-redux";
import {logoutAction} from "../redux/actions/mainActions";
import {WELCOME_TEXT_NOT_LOGGED_IN} from "../utils/constants";
import '../css/header.css';


const Header = ({username, addPostModalToggle}) => {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutAction());
    }

    const loggedOutHeader = (
        <div className="header">
            <h3>{WELCOME_TEXT_NOT_LOGGED_IN}</h3>
        </div>
    );
    const loggedInHeader = (
        <div className="header">
            <button onClick={addPostModalToggle}>Create Post</button>
            <div className="userCtr">
                <p><strong>Welcome, {username}!</strong></p>
                <button onClick={logoutHandler}>Log out</button>
            </div>
        </div>
    );

    return (username ? loggedInHeader : loggedOutHeader);
};

export default Header;