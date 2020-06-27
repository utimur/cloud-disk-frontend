import React, {useRef} from 'react';
import "./leftBar.css";
import {uploadFile} from "../../../actions/file";
import {useDispatch, useSelector} from "react-redux";

const LeftBar = ({reference, width}) => {
    const favorMock = [{name:"Concerts"},{name:"Playbacks"},{name:"Мои документы"},{name:"Видео"},{name:"Фотографии"}, {name:"ОЧЕНЬ ОЧЕН ОЧЕНЬ ДЛИННОЕ НАЗВАНИЕ"}]
    const parentId = useSelector(state => state.fileReducer.parentId)
    const fileInputRef = useRef()
    const dispatch = useDispatch()

    function uploadFilesChange(e) {
        const files = [...fileInputRef.current.files]
        files.forEach(file => dispatch(uploadFile(file, parentId)))
    }

    return (
        <div ref={reference} style={{width:width+"px"}} className="leftbar">
            <div className="favourites">
                <div className="favourites-header">Избранное</div>
                {favorMock.map(favor =>
                    <div className="favourites-item">{favor.name}</div>
                )}
            </div>
            <div className="memory">
                <div className="fullbar"><div className="freebar" style={{width:"52%"}}/></div>
                <div className="memory-count">Свободно 5.2\10гб</div>
            </div>
            <div className="upload">
                <label htmlFor="upload-input">Загрузить файлы</label>
                <input multiple={true} ref={fileInputRef} onChange={(e) => uploadFilesChange(e)} id="upload-input" type="file"/>
            </div>
        </div>
    );
};

export default LeftBar;