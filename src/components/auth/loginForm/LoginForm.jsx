import React, {useEffect, useRef, useState} from 'react';
import Input from "../../../utils/input/Input";
import "./LoginForm.css"
import Button from "../../../utils/Button/Button";
import Checkbox from "../../../utils/checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {activationAgain, login} from "../../../actions/user";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../../../config";

const LoginForm = (props) => {
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loginActivateError, setLoginActivateError] = useState(false)
    const [authError, setAuthError] = useState(false)
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const [needSendActivation, setNeedSendActivation] = useState(false)

    useEffect(()=> {

    }, [])

    function loginClick() {
        dispatch(login(username, password,checked, props.history, setLoginActivateError, setAuthError, setNeedSendActivation))
       /* setUsername("")
        setPassword("")
        setChecked(false)
        */
        setLoginActivateError(false)
        setAuthError(false)
        setNeedSendActivation(false)

    }

    function activationAgainClick() {
        activationAgain(username, password, true)
        /* setUsername("")
       setPassword("")
       setChecked(false)
       */
        setLoginActivateError(false)
        setAuthError(false)
        setNeedSendActivation(false)
    }

    return ( !isAuth ?
        <div className="login">
            <div className="header login-header">Авторизация</div>
            <Input value={username} setValue={setUsername} type="text" placeholder="Введите имя пользователя..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <div className="login-btns">
                <Checkbox checked={checked} setChecked={setChecked} text = "Запомнить меня?"/>
                <Button click={loginClick} text="Войти"/>
            </div>
            <div className="forget" onClick={()=>props.history.push("/auth/forget")}>Забыли пароль?</div>
            { loginActivateError?
                <div>
                    <div className={"login-error"}> Для авторизации необходимо активировать аккаунт.</div>
                    { needSendActivation?
                        <div>
                            <div className={"login-error"}> Отправить письмо с активацией ещё раз?</div>
                            <Button click={activationAgainClick} text="Отправить"/>
                        </div>
                        : ""
                    }
                </div>
                : ""}
            { authError? <div className={"login-error"}> Неправильный логин или пароль </div>: ""}
        </div>
            :
            <Redirect to="/"/>
    );
};

export default LoginForm;