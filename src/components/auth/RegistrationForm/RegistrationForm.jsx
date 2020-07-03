import React, {useState} from 'react';
import "./RegistrationForm.css";
import Input from "../../../utils/input/Input";
import Checkbox from "../../../utils/checkbox/Checkbox";
import Button from "../../../utils/Button/Button";
import {registration} from "../../../actions/user";

const RegistrationForm = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const [checked, setChecked] = useState(false)

    const regOnClick = () => {
        registration(username,password,email)
        setUsername("")
        setPassword("")
        setEmail("")
        setChecked(false)
    }


    return (
        <div className={"regForm"}>
            <div className={"regForm-header"}>Регистрация</div>
            <Input placeholder = "Введите имя пользователя..."  value = {username} setValue = {setUsername}/>
            <Input placeholder = "Введите пароль..." value = {password} setValue = {setPassword} type = {"password"}/>
            <Input placeholder = "Введите адрес электронной почты..." value = {email} setValue = {setEmail}/>
            <div className={"regForm-checkboxAndButton"}>
                <Checkbox text = "Согласен с условиями соглашения" checked = {checked} setChecked = {setChecked}/>
                <Button text = "Зарегистрироваться" click = {regOnClick} />
            </div>
        </div>
    );
};

export default RegistrationForm;