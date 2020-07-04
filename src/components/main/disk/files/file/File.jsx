import React, {useState} from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import directoryDark from "../../../../../assets/img/directory-dark.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import fileDarkLogo from "../../../../../assets/img/file-dark.svg";
import {deleteFileFromServer, downloadFile, getFiles, sizeFormater} from "../../../../../actions/file";
import {useDispatch, useSelector} from "react-redux";
import {setParentId} from "../../../../../reducers/fileReducer";
import axios from 'axios';
import {saveFavourite} from "../../../../../actions/favourites";
import Checkbox from "../../../../../utils/checkbox/Checkbox";
import {CLIENT_URL} from "../../../../../config";

const File = ({file}) => {

    const dispatch = useDispatch()
    const filesStyle = useSelector(state => state.fileReducer.filesStyle)
    const [isFavourite, setIsFavourite] = useState(file.isFavourite)

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

    function favouriteClick(e, file) {
        e.stopPropagation()
        dispatch(saveFavourite(file, setIsFavourite))
    }


    if(filesStyle == "list"){
        return (
            <div className="file-list"  onClick={() => onFileClick(file)}>
                <img className="file-list-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
                <div className="file-list-name">{file.name}</div>
                <div className="file-list-date">26.06.2020</div>
                <div className="file-list-size">{sizeFormater(file.size)}</div>
                <div className="share">
                    <div className="file-list-share-btn" ><button/></div>
                    <div className="share-menu">
                        <div className="share-menu-flex">
                            <div className="share-menu-flex-link">{CLIENT_URL}</div>
                            <Checkbox/>
                        </div>
                        <button className="share-menu-btn">Копировать ссылку</button>
                    </div>
                </div>
                {file.type != "dir" && <div className="file-list-download-btn" onClick={(e)=>downloadClick(e)}><button/></div>}
                {file.type == "dir" && !isFavourite && <div className="file-list-favor-btn" onClick={(e) => favouriteClick(e, file)}><button/></div>}
                {file.type == "dir" && isFavourite && <div className="file-list-unfavor-btn" onClick={(e) => favouriteClick(e, file)}><button/></div>}
                <div className="file-list-basket-btn"  onClick={(e)=>deleteClick(e)}><button/></div>
            </div>
        );
    }
    if (filesStyle == "small-plate") {
        return (
            <div className="file-small-plate"  onClick={() => onFileClick(file)}>
                <img className="file-small-plate-img" src={file.type === "dir" ? directoryDark : fileDarkLogo} alt=""/>
                <div className="file-small-plate-name">{file.name}</div>
                <div className="file-small-plate-btns">
                    <div className="file-small-plate-btns-share-btn"><button/></div>
                    {file.type != "dir" && <div className="file-small-plate-btns-download-btn" onClick={(e)=>downloadClick(e)}><button/></div>}
                    {file.type == "dir" && !isFavourite && <div className="file-small-plate-btns-favor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    {file.type == "dir" && isFavourite && <div className="file-small-plate-btns-unfavor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    <div className="file-small-plate-btns-basket-btn"  onClick={(e)=>deleteClick(e)}><button/></div>
                </div>

            </div>
        );
    }

};

export default File;