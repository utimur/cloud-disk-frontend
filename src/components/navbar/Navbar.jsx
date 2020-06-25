import React, {useState} from 'react';
import './navbar.css'
import logo from '../../assets/img/navbar-logo.svg'
import avatar from '../../assets/img/navbar-avatar.svg'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = (props) => {

    const isAuth = useSelector(state => state.userReducer.isAuth)
    const [dropListVisible, setDropListVisible] = useState("none")
    const dispatch = useDispatch()

    function avatarClick() {
        if(dropListVisible=="none")
            setDropListVisible("flex")
        else
            setDropListVisible("none")
    }

    function logOutClick() {
        dispatch(logout())
        props.history.push("/auth/login")
    }

    return (
        <div className="navbar">
            <div className="navbar-wrap">
                <img src={logo} alt=""/>
                <div className="logo-name" onClick={()=>props.history.push("/")}>DropDisk</div>

                {isAuth ?
                    <div className="right" onClick={()=>avatarClick()}>
                        <div className="username">Ulbi timur</div>
                        <img src={avatar} alt=""/>
                        <div className="droplist" style={{display: dropListVisible}}>
                            <div className="droplist-item" onClick={()=>props.history.push("/profile")}>Профиль</div>
                            <div className="droplist-item" onClick={()=>logOutClick()}>Выход</div>
                        </div>
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