import React, {useEffect} from 'react';
import "./files.css"
import File from "./file/File";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../../actions/file";

const Files = () => {

    const files = useSelector(state => state.fileReducer.files)


    const parentId = useSelector(state => state.fileReducer.parentId)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getFiles(parentId))
    }, [])

    return (
        <div className="files">
            <div className="files-header">
                <div className="files-header-name">Название</div>
                <div className="files-header-date">Дата</div>
                <div className="files-header-size">Размер</div>
            </div>
            {files.map(file=>
                <File key={file.id} file={file}/>
            )}
        </div>
    );
};

export default Files;