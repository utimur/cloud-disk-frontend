import React, {useRef} from 'react';
import './app.css'
import axios from 'axios';
import {BrowserRouter, Route} from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Auth from "./auth/Auth";

const App = () => {


  return (
    <BrowserRouter>
        <div className="app">
            <Route component={Navbar}/>
            <div className="wrap">
                <Route path="/auth" component={Auth}/>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
