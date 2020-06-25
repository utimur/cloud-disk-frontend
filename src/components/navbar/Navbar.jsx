import React from 'react';
import './navbar.css'
import logo from '../../assets/img/navbar-logo.svg'
import avatar from '../../assets/img/navbar-avatar.svg'
import {useSelector} from "react-redux";

const Navbar = (props) => {

    const isAuth = useSelector(state => state.userReducer.isAuth)

    return (
        <div className="navbar">
            <div className="navbar-wrap">
                <img src={logo} alt=""/>
                <div className="logo-name" onClick={()=>props.history.push("/")}>DropDisk</div>

                {isAuth ?
                    <div className="right">
                        <div className="username">Ulbi timur</div>
                        <img src={avatar} alt=""/>
                    </div>
                    :
                    <div className="right">
                        <div className="login" onClick={()=>props.history.push("/auth/login")}>Войти</div>
                        <div className="regist" onClick={()=>props.history.push("/auth/registration")}>Регистрация</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;