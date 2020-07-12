import axios from 'axios'
import {API_URL} from "../config";
import {updateUser, userLogin, updateUserAvatar} from "../reducers/userReducer";

export const login = (username, password, rememberMe, history, setActivateError, setAuthError, setNeedSendActivation) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {username, password})
            dispatch(userLogin(response.data.user))
            rememberMe == true ? localStorage.setItem("token", response.data.token) : sessionStorage.setItem("token", response.data.token)
            rememberMe == true ? localStorage.setItem("rememberMe", "true") : localStorage.setItem("rememberMe", "false")
            history.push("/")
        }
        catch (e) {
            switch (e.response.data.error) {
                case "UserIsNotActivatedException": {
                    setActivateError(true);
                    if (e.response.data.needSendActivation === true)
                        setNeedSendActivation(true)
                    break;
                }
                case "UserNotFoundException" : {
                    setAuthError(true);
                    break;
                }
                default: {
                    break;
                }

            }
        }
    }
}


export const auth = (authorization = "") => {
    if (authorization === "")
        authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/auth`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(userLogin(response.data.user))
        if(localStorage.getItem("rememberMe") == "true") {
            localStorage.setItem("token", response.data.token)
        }
    }
}
export const registration = async (username, password, email) => {
    axios.post(`${API_URL}/auth/register`, {username, password, mail:email}).catch(e =>
        alert("Registration is not success")
    )
}


export const activation = (authorization) => {
    return async (dispatch) => {
        try {
            await axios.get(`${API_URL}/auth/activation`, {headers: {Authorization: `Bearer ${authorization}`}})
            dispatch(auth(authorization))
        }
        catch (e) {
            switch (e.response.data.error) {
                case "UserIsAlreadyActivatedException": {
                    alert("User is already activated!")
                    break;
                }
                case "UserNotFoundException": {
                    alert("The user is not found");
                    break;
                }
                default: {
                    break;
                }
            }

        }

    }
}

export const activationAgain = (username, password, needSendActivation) =>{
    axios.post(`${API_URL}/auth/login`, {username, password, needSendActivation}).catch(e => {
        alert("Activation is not sent")
    })
}

export const updateAvatar = (avatar) => {
    return async (dispatch) => {
        const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
        let formData = new FormData();
        formData.append("img", avatar);
        formData.append("filename", avatar.name);
        const response = await axios.post(`${API_URL}/users/avatar`, formData, {headers: {Authorization: `Bearer ${authorization}`}})
        console.log("Base64 is " + response.data.avatar)
        dispatch(updateUserAvatar(response.data.avatar))
    }

}



