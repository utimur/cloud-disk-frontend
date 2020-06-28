import React from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import {getFiles, sizeFormater} from "../../../../../actions/file";
import {useDispatch} from "react-redux";
import {setParentId} from "../../../../../reducers/fileReducer";

const File = ({file}) => {
    const dispatch = useDispatch()

    function doubleClick(event ,file) {
        event.preventDefault()
        event.stopPropagation()
        if(file.type == "dir") {
            dispatch(getFiles(file.id))
            console.log(file)
        }
    }

    return (
        <div className="file" onClick={(event) => doubleClick(event,file)}>
            <img className="file-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">26.06.2020</div>
            <div className="file-size">{sizeFormater(file.size)}</div>
            <div className="file-favor-btn" onClick={()=>alert("asf")}><button/></div>
            <div className="file-basket-btn"><button/></div>
        </div>
    );
};

export default File;