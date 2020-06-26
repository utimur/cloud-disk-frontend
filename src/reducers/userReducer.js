const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const defaultState = {
    currentUser: {
        username:"",
    },
    isAuth: false,
}


export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem("token")
            return {
                state:undefined,
                isAuth: false
            }
        default:
            return state

    }
}


export const userLogin = (user) => ({type:LOGIN, payload:user})
export const logout = () => ({type:LOGOUT})