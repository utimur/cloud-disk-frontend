import axios from 'axios'
import {API_URL} from "../config";
import {userLogin} from "../reducers/userReducer";

export const login = (username, password, rememberMe, history) => {
    return async (dispatch) => {
        const response = await axios.post(`${API_URL}/auth/login`, {username, password})
        dispatch(userLogin(response.data.user))
        rememberMe == true ? localStorage.setItem("token", response.data.token) : sessionStorage.setItem("token", response.data.token)
        rememberMe == true ? localStorage.setItem("rememberMe", "true") : localStorage.setItem("rememberMe", "false")
        history.push("/")
    }
}


export const auth = () => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/auth`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(userLogin(response.data.user))
        if(localStorage.getItem("rememberMe") == "true") {
            localStorage.setItem("token", response.data.token)
        }
    }
}



