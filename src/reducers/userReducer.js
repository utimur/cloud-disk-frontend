const LOGIN = "LOGIN"

const defaultState = {
    currentUser: {},
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

        default:
            return state

    }
}


export const userLogin = (user) => ({type:LOGIN, payload:user})