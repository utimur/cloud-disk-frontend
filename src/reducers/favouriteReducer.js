const SET_FAVOURITES = "SET_FAVOURITES"
const ADD_FAVOURITE = "ADD_FAVOURITE"
const REMOVE_FAVOURITE = "REMOVE_FAVOURITE"

const defaultState = {
    favourites:[]
}


export default function favouriteReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FAVOURITES:
            return {
                ...state,
                favourites: action.payload
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        case REMOVE_FAVOURITE:
            return {
                ...state,
                favourites: state.favourites.filter(favor => favor.id != action.payload.id)
            }
        default:
            return state

    }
}

export const setFavourites = (files) => ({type:SET_FAVOURITES, payload:files})
export const addFavourite = (file) => ({type:ADD_FAVOURITE, payload:file})
export const removeFavourite = (file) => ({type:REMOVE_FAVOURITE, payload:file})
