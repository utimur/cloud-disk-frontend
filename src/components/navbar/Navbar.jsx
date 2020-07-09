import React, {useEffect, useState} from 'react';
import './navbar.css'
import logo from '../../assets/img/navbar-logo.svg'
import avatar from '../../assets/img/navbar-avatar.svg'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import axios from 'axios'
import {getFiles, searchFile} from "../../actions/file";
import {setIsSearch} from "../../reducers/fileReducer";

const Navbar = (props) => {

    const isAuth = useSelector(state => state.userReducer.isAuth)
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const parentId = useSelector(state => state.fileReducer.parentId)
    const isSearch = useSelector(state => state.fileReducer.isSearch)
    const [dropListVisible, setDropListVisible] = useState("none")
    const [searchValue, setSearchValue] = useState("")
    const dispatch = useDispatch()
    const [searchTimeout, setSearchTimeout] = useState(false);

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

    async function searchInputChange(e) {
        setSearchValue(e.target.value)
        dispatch(setIsSearch(true))
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        if(e.target.value != "") {
            setSearchTimeout(setTimeout(async (value) => {
                dispatch(searchFile(value));
                dispatch(setIsSearch(false))
                setSearchTimeout(false);
            }, 500, e.target.value));
        } else {
            dispatch(setIsSearch(false))
            dispatch(getFiles(parentId))
        }
    }


    return (
        <div className="navbar">
            <div className="navbar-wrap">
                <img src={logo} alt=""/>
                <div className="logo-name" onClick={()=>props.history.push("/disk")}>DropDisk</div>
                {isAuth &&
                <input onChange={(e)=>searchInputChange(e)} value={searchValue} className="search-input" placeholder="Поиск по названию..." type="text"/>
                }
                {isAuth ?
                    <div className="right" onClick={()=>avatarClick()}>
                        <div className="username">{currentUser.username}</div>
                        <img src={avatar} alt=""/>
                        <div className="droplist" style={{display: dropListVisible}}>
                            <div className="droplist-item" onClick={()=>props.history.push("/profile")}>Профиль</div>
                            <div className="droplist-item" onClick={()=>logOutClick()}>Выход</div>
                        </div>
                    </div>
                    :
                    <div className="right">
                        <div className="navbar-login" onClick={()=>props.history.push("/auth/login")}>Войти</div>
                        <div className="navbar-regist" onClick={()=>props.history.push("/auth/registration")}>Регистрация</div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;