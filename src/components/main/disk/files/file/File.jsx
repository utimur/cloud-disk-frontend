import React, {useState} from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import {deleteFileFromServer, downloadFile, getFiles, sizeFormater} from "../../../../../actions/file";
import {useDispatch, useSelector} from "react-redux";
import {setParentId} from "../../../../../reducers/fileReducer";
import axios from 'axios';

const File = ({file}) => {

    const dispatch = useDispatch()

    function onFileClick(file) {
        if(file.type == "dir") {
            dispatch(getFiles(file.id))
            console.log(file)
        }
    }

    function downloadClick(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClick(e) {
        e.stopPropagation()
        dispatch(deleteFileFromServer(file))
    }



    return (
        <div className="file"  onClick={() => onFileClick(file)}>
            <img className="file-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">26.06.2020</div>
            <div className="file-size">{sizeFormater(file.size)}</div>
            {file.type != "dir" && <div className="file-download-btn" onClick={(e)=>downloadClick(e)}><button/></div>}
            <div className="file-favor-btn" onClick={(e)=>e.stopPropagation()}><button/></div>
            <div className="file-basket-btn"  onClick={(e)=>deleteClick(e)}><button/></div>
        </div>
    );
};

export default File;