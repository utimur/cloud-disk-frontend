import React from 'react';
import LeftBar from "./leftBar/LeftBar";
import Disk from "./disk/Disk";
import "./main.css";
import CreateNewDir from "./createNewDir/CreateNewDir";

const Main = (props) => {
    return (
        <div className="main">
            <LeftBar/>
            <Disk/>
            <CreateNewDir/>
        </div>
    );
};

export default Main;