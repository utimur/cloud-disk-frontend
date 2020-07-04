import {API_URL} from "../config";
import axios from 'axios';
import {addFavourite, removeFavourite, setFavourites} from "../reducers/favouriteReducer";

export const getFavourites = () => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files/favourites`, {headers: {Authorization: `Bearer ${authorization}`}});
        dispatch(setFavourites(response.data))
    }
}

export const saveFavourite = (file, setIsFavourite) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.post(`${API_URL}/files/favourites`,
            {
                id:file.id,
                type: file.type,
            } ,{headers: {Authorization: `Bearer ${authorization}`}});
        if (response.data.isFavourite) {
            dispatch(addFavourite(response.data));
        } else {
            dispatch(removeFavourite(response.data));
        }
        setIsFavourite(response.data.isFavourite)
    }
}