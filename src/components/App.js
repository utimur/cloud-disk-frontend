import React, {useEffect, useRef} from 'react';
import './app.css'
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Auth from "./auth/Auth";
import Main from "./main/Main";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../actions/user";
import Profile from "./profile/Profile";

const App = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(auth());
    },[])

  return (
    <BrowserRouter>
        <div className="app">
            <Route component={Navbar}/>
            <div className="wrap">
                {!isAuth && <Route path="/auth" component={Auth}/>}
                <Route exact path="/disk/:link" component={Main}/>
                {isAuth && <Route exact path="/disk" component={Main}/>}
                {isAuth && <Route exact path="/profile" component={Profile}/>}
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
