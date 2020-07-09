import React, {useState} from 'react';
import "./file.css";
import directory from "../../../../../assets/img/directory.svg";
import directoryDark from "../../../../../assets/img/directory-dark.svg";
import fileLogo from "../../../../../assets/img/file.svg";
import fileDarkLogo from "../../../../../assets/img/file-dark.svg";
import {
    deleteFileFromServer,
    downloadFile,
    getFiles,
    getFilesByLink,
    share,
    sizeFormater
} from "../../../../../actions/file";
import {useDispatch, useSelector} from "react-redux";
import {saveFavourite} from "../../../../../actions/favourites";
import Checkbox from "../../../../../utils/checkbox/Checkbox";
import {CLIENT_URL} from "../../../../../config";
import {logout} from "../../../../../reducers/userReducer";

const File = ({file}) => {

    const dispatch = useDispatch()
    const filesStyle = useSelector(state => state.fileReducer.filesStyle)
    const link = useSelector(state => state.fileReducer.link)
    const [shareLink, setShareLink] = useState(file.access_link);
    const [shareDisplay, setShareDisplay] = useState("none")
    const [shareChecked, setShareChecked] = useState(true)
    const [isFavourite, setIsFavourite] = useState(file.isFavourite)
    const [copyBtnText, setCopyBtnText] = useState("Скопировать ссылку")

    function onFileClick(file) {
        if(file.type == "dir") {
            if (link == null) {
                dispatch(getFiles(file.id));
            } else {
                dispatch(getFilesByLink(link, file.id))
            }
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

    function shareClick(e) {
        e.stopPropagation()
        share(file, shareLink, setShareLink, shareDisplay, setShareDisplay).then(()=> setCopyBtnText("Скопировать ссылку"))
    }

    const Share = () => {
        function copyClick() {
            var aux = document.createElement("input");
            aux.setAttribute("value", `${CLIENT_URL}/disk/${shareLink}`);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
            setCopyBtnText("Скопировано в буфер обмена")
        }

        return (
            <div className="share" onClick={(e)=>e.stopPropagation()} onMouseOver={(e)=> e.stopPropagation()}>
                <div className="file-share-btn" ><button onClick={(e)=>shareClick(e)}/></div>
                <div className="share-menu" style={{display:shareDisplay}}>
                    <div className="share-menu-flex">
                        <div className="share-menu-flex-link">{CLIENT_URL}/disk/{shareLink}</div>
                        {/*<Checkbox checked={shareChecked} setChecked={setShareChecked}/>*/}
                    </div>
                    <button className="share-menu-btn" onClick={() => copyClick()}>{copyBtnText}</button>
                </div>
            </div>
        )
    }

    if(filesStyle == "list"){
        return (
            <div className="file-list"  onClick={() => onFileClick(file)}>
                <img className="file-list-img" src={file.type === "dir" ? directory : fileLogo} alt=""/>
                <div className="file-list-name">{file.name}</div>
                <div className="file-list-date">{file.createdAt.substring(0,10)}</div>
                <div className="file-list-size">{sizeFormater(file.size)}</div>
                <Share/>
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
                    <Share/>
                    {file.type != "dir" && <div className="file-small-plate-btns-download-btn" onClick={(e)=>downloadClick(e)}><button/></div>}
                    {file.type == "dir" && !isFavourite && <div className="file-small-plate-btns-favor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    {file.type == "dir" && isFavourite && <div className="file-small-plate-btns-unfavor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    <div className="file-small-plate-btns-basket-btn"  onClick={(e)=>deleteClick(e)}><button/></div>
                </div>
            </div>
        );
    }

    if (filesStyle === "big-plate") {
        return (
            <div className={"file-big-plate"}>
                <img className={"file-big-plate-img"} src={file.type === "dir" ? directoryDark : fileDarkLogo} alt="big-plate-img"/>
                <div className={"file-big-plate-name"}> {file.name }</div>
                <div className={"file-big-plate-btns"}>
                    <Share/>
                    {file.type !== "dir" && <div className={"file-big-plate-btns-download-btn"} onClick={(e) => downloadClick(e)}><button/></div>}
                    {file.type == "dir" && !isFavourite && <div className="file-big-plate-btns-favor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    {file.type == "dir" && isFavourite && <div className="file-big-plate-btns-unfavor-btn" onClick={(e)=>favouriteClick(e,file)}><button/></div>}
                    <div className={"file-big-plate-btns-basket-btn"} onClick={(e) => deleteClick(e)}><button/></div>
                </div>
            </div>
        )
    }
};

export default File;



