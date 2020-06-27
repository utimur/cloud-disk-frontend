import React from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import {sizeFormater} from "../../../../../actions/file";

const File = ({file}) => {

    return (
        <div className="file">
            <img className="file-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
            <div className="file-name">{file.name}</div>
            <div className="file-date">26.06.2020</div>
            <div className="file-size">{sizeFormater(file.size)}</div>
                <div className="file-favor-btn"><button/></div>
                <div className="file-basket-btn"><button/></div>
        </div>
    );
};

export default File;