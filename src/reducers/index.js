import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReducer from "./fileReducer";
import favouriteReducer from "./favouriteReducer";
import shareReducer from "./shareReducer";

const reducer =  combineReducers({
    userReducer,
    fileReducer,
    favouriteReducer,
    shareReducer,
})



// Создание редакс стора, первый аргумент - главный редюсер, который обьединяет в себе все редьюсеры
// второй аргумент Redux thunk - библиотека для ассинхронности, объединенная с инструментами для отладки редакса
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

