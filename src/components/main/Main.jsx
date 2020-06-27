import React, {useRef, useState} from 'react';
import LeftBar from "./leftBar/LeftBar";
import Disk from "./disk/Disk";
import "./main.css";
import CreateNewDir from "./createNewDir/CreateNewDir";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {logout} from "../../reducers/userReducer";
import Uploader from "./uploader/Uploader";

const Main = (props) => {

    const leftbarRef = useRef()
    const delRef = useRef()
    const [defaultPageX, setDefaultPageX] = useState(0);
    const [width, setWidth] = useState(170);
    const [currentWidth, setCurrentWidth] = useState(170);
    const [defaultOffsetWidth, setDefaultOffsetWidth] = useState(0);
    const [down, setDown] = useState(false);


    function moveAt(pageX, defaultPageX, offsetWidth) {
        if (down  && currentWidth + (pageX-defaultPageX)>=170 && currentWidth + (pageX-defaultPageX) <= 500) {
            setWidth(currentWidth + (pageX-defaultPageX))
        }
        console.log(width)
    }

    function onMouseMove(event) {
        moveAt(event.pageX, defaultPageX, defaultOffsetWidth);
    }

    function mouseDown(e) {
        e.preventDefault()
        e.stopPropagation()

        setDown(true)
        const defaultPageX = e.pageX
        const offsetWidth = e.target.offsetWidth
        setDefaultPageX(defaultPageX)
        setDefaultOffsetWidth(offsetWidth)
    }

    function mouseUp(e) {
        e.preventDefault()
        e.stopPropagation()
        setDown(false)
        setCurrentWidth(width)
        console.log(width)
    }


    return (
        <div onMouseUp={(e) => mouseUp(e)} onMouseMove={down ? (e) => onMouseMove(e) : ""} className="main">
            <LeftBar width={width} reference={leftbarRef} />
            <div className="delimeter" onmouse onMouseUp={(e)=>mouseUp(e)} onMouseDown={(e)=>mouseDown(e)}/>
            <Disk/>
            <CreateNewDir/>
            <Uploader/>
        </div>
    );
};

export default Main;