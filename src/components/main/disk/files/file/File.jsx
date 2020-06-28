import React from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import {getFiles, sizeFormater} from "../../../../../actions/file";
import {useDispatch} from "react-redux";
import {setParentId} from "../../../../../reducers/fileReducer";
import axios from 'axios';

const File = ({file}) => {
    const dispatch = useDispatch()

    function onFileDoubleClick(file) {
        if(file.type == "dir") {
            dispatch(getFiles(file.id))
            console.log(file)
        }
    }

    async function downloadClick(e) {
        const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
        const response = await fetch(`http://localhost:8080/files/download?file_id=${file.id}`,{headers:{Authorization: `Bearer ${authorization}`}});
        if (response.status === 200) {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${file.name}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    }

    return (
        <div className="file" onDoubleClick={() => onFileDoubleClick(file)}>
            <img className="file-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">26.06.2020</div>
            <div className="file-size">{sizeFormater(file.size)}</div>
            {file.type != "dir" && <div className="file-download-btn" onClick={(e)=>downloadClick(e)}><button/></div>}
            <div className="file-favor-btn" onClick={(e)=>e.stopPropagation()}><button/></div>
            <div className="file-basket-btn" onClick={(e)=>e.stopPropagation()}><button/></div>
        </div>
    );
};

export default File;