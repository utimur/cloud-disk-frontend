import React, {useRef} from 'react';
import './app.css'
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Auth from "./auth/Auth";
import Main from "./main/Main";
import {useSelector} from "react-redux";

const App = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth)

  return (
    <BrowserRouter>
        <div className="app">
            <Route component={Navbar}/>
            <div className="wrap">
                {!isAuth && <Route path="/auth" component={Auth}/>}
                {isAuth && <Route exact path="/" component={Main}/>}
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
