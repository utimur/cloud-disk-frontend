import React, {useEffect} from 'react';
import "./uploader.css";
import {useDispatch, useSelector} from "react-redux";
import {setUploaderDisplay} from "../../../reducers/fileReducer";
import UploadingFile from "./uploadingFile/UploadingFile";

const Uploader = (props) => {
    const uploaderDisplay = useSelector(state => state.fileReducer.uploaderDisplay)
    const uploadingFiles = useSelector(state => state.fileReducer.uploadingFiles)
    const dispatch = useDispatch();

    useEffect(()=> {},[uploaderDisplay])

    return (
        <div className="uploader" style={{display:uploaderDisplay}}>
            <div className="uploader-header">
                <div className="uploader-header-name">Загрузки</div>
                <div className="uploader-header-close">
                    <button className="uploader-header-close-btn" onClick={()=>dispatch(setUploaderDisplay("none"))}></button>
                </div>
            </div>
            {uploadingFiles.map(file =>
                <UploadingFile file={file}/>
            )}
        </div>
    );
};

export default Uploader;