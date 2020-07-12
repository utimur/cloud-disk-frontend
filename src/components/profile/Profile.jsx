import React, {useState} from 'react';
import Button from "../../utils/Button/Button";
import "./profile.css"
import {useDispatch, useSelector} from "react-redux";
import {updateAvatar} from "../../actions/user";

const Profile = () => {
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const dispatch = useDispatch()

    const clickUpdateAvatar = (e) => {
        const avatar = e.target.files[0]
        dispatch(updateAvatar(avatar))
    }


    return (
        <div className={"profile"}>
            <div className={"profile-img"} style={{backgroundImage: `url("data:image/jpg;base64, ${currentUser.avatar}")`}}><input type={"file"} id={"avatar-input"} accept="image/jpeg, image/png"
                                                  onChange={(event) => {clickUpdateAvatar(event)}} /> <label htmlFor={"avatar-input"}/></div>
            <div className={"profile-name"}>{currentUser.username}</div>
            <div className={"profile-fields"}>
                <div className={"profile-email"}>email: {currentUser.mail}</div>
                <div className={"profile-freeSpace"}>free space: {10 -currentUser.freeSpace}gb</div>
            </div>
            <div className={"profile-buttons"}>
                <div className={"profile-changePass"}><Button text = "Сменить пароль"/></div>
                <div className={"profile-resetDisk"}><Button text = "Очистить диск"/></div>
            </div>
        </div>
    );
};

export default Profile;