const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const UPDATE_USER_AVATAR = "UPDATE_USER_AVATAR"
const UPDATE_USER = "UPDATE_USER"

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
                state: undefined,
                isAuth: false
            }
        case UPDATE_USER_AVATAR:
            return {
                ...state, currentUser: {
                    ...state.currentUser,
                    avatar: action.payload
                }
                }
        case UPDATE_USER:
            return {
                ...state, currentUser: action.payload
            }
        default:
            return state

    }
}


export const userLogin = (user) => ({type:LOGIN, payload:user})
export const logout = () => ({type:LOGOUT})
export const updateUserAvatar = (avatar) => ({type: UPDATE_USER_AVATAR, payload: avatar})
export const updateUser = (user) => ({type: UPDATE_USER, payload: user})