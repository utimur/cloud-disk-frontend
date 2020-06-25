import axios from 'axios'
import {API_URL} from "../config";
import {userLogin} from "../reducers/userReducer";

export const login = (username, password, rememberMe, history) => {
    return async (dispatch) => {
        const response = await axios.post(`${API_URL}/auth/login`, {username, password})
        dispatch(userLogin(response.data.user))
        rememberMe == true ? localStorage.setItem("token", response.data.token) : localStorage.removeItem("token")
        history.push("/")
    }
}