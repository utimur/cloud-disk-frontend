import React, {useEffect, useRef, useState} from 'react';
import Input from "../../../utils/input/Input";
import "./LoginForm.css"
import Button from "../../../utils/Button/Button";
import Checkbox from "../../../utils/checkbox/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../actions/user";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const isAuth = useSelector(state => state.userReducer.isAuth)

    useEffect(()=> {

    }, [])

    function loginClick() {
        dispatch(login(username, password,checked, props.history))

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
        </div>
            :
            <Redirect to="/"/>
    );
};

export default LoginForm;