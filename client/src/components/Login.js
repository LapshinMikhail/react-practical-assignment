import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginAction} from "../redux/actions/mainActions";
import {LOGIN_NAME_INPUT_PLACEHOLDER} from "../utils/constants";
import '../css/login.css';

const Login = () => {

    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();
    const loginHandler = () => {
        if (userName) dispatch(loginAction(userName));
    }

    return (
        <div className="login">
            <input
                type="text"
                placeholder={LOGIN_NAME_INPUT_PLACEHOLDER}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={loginHandler}>Log in</button>
        </div>
    );
};

export default Login;