import React from 'react';
import "./RegistrationForm.css";
import Input from "../../../utils/input/Input";
import Checkbox from "../../../utils/checkbox/Checkbox";
import Button from "../../../utils/Button/Button";

const RegistrationForm = () => {
    return (
        <div className={"regForm"}>
            <div className={"regForm-header"}>Регистрация</div>
            <Input placeholder = "Введите имя пользователя..." />
            <Input placeholder = "Введите пароль..."/>
            <Input placeholder = "Введите адрес электронной почты..."/>
            <div className={"regForm-checkboxAndButton"}>
                <Checkbox text = "Согласен с условиями соглашения"/>
                <Button text = "Войти"/>
            </div>
        </div>
    );
};

export default RegistrationForm;