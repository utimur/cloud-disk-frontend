import React from 'react';
import Input from "../../../utils/input/Input";
import "./LoginForm.css"
import Button from "../../../utils/Button/Button";

const LoginForm = () => {
    return (
        <div className="login">
            <div className="header login-header">Авторизация</div>
            <Input type="text" placeholder="Введите имя пользователя..."/>
            <Input type="text" placeholder="Введите пароль..."/>
            <div className="login-btns">
                <label htmlFor="checkbox">Запомнить меня?</label>
                <input id="checkbox" type="checkbox"/>
                <Button text="Войти"/>
            </div>
            <div className="forget">Забыли пароль?</div>
        </div>
    );
};

export default LoginForm;