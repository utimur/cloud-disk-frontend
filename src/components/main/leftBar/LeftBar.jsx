import React, {useEffect, useRef} from 'react';
import "./leftBar.css";
import {sizeFormater, uploadFile} from "../../../actions/file";
import {useDispatch, useSelector} from "react-redux";

const LeftBar = ({reference, width}) => {
    const favorMock = [{name:"Concerts"},{name:"Playbacks"},{name:"Мои документы"},{name:"Видео"},{name:"Фотографии"}, {name:"ОЧЕНЬ ОЧЕН ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ"}]
    const parentId = useSelector(state => state.fileReducer.parentId)
    const currentUser = useSelector(state => state.userReducer.currentUser)
    const fileInputRef = useRef()
    const dispatch = useDispatch()

    function uploadFilesChange(e) {
        const files = [...fileInputRef.current.files]
        files.forEach(file => dispatch(uploadFile(file, parentId)))
    }

    console.log(Math.ceil((currentUser.freeSpace / (10*1024*1024*1024))*100))

    return (
        <div ref={reference} style={{width:width+"px"}} className="leftbar">
            <div className="favourites">
                <div className="favourites-header">Избранное</div>
                {favorMock.map(favor =>
                    <div className="favourites-item">{favor.name}</div>
                )}
            </div>
            <div className="memory">
                <div className="fullbar"><div className="freebar" style={{width:Math.ceil((currentUser.freeSpace / (10*1024*1024*1024))*100)+"%"}}/></div>
                <div className="memory-count" >Занято {sizeFormater(currentUser.freeSpace)}\10Gb</div>
            </div>
            <div className="upload">
                <label htmlFor="upload-input">Загрузить файлы</label>
                <input multiple={true} ref={fileInputRef} onChange={(e) => uploadFilesChange(e)} id="upload-input" type="file"/>
            </div>
        </div>
    );
};

export default LeftBar;