import React from 'react';
import './auth.css'
import logo from '../../assets/img/auth-logo.svg'
import {Route} from "react-router-dom";
import LoginForm from "./loginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import {useSelector} from "react-redux";

const Auth = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth)

    return (
        <div className="auth">
            <div className="auth-flex">
                <div className="auth-header">
                    <img src={logo} alt=""/>
                    <div className="auth-header-text">Добро пожаловать в DropDisk</div>
                </div>
                <div className="auth-form">
                    {!isAuth && <Route path="/auth/login" component={LoginForm}/>}
                    {!isAuth && <Route path="/auth/registration" component={RegistrationForm}/>}
                </div>
            </div>
        </div>
    );
};

export default Auth;