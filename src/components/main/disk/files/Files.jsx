import React, {useEffect} from 'react';
import "./files.css"
import File from "./file/File";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../../actions/file";

const Files = () => {

    const files = useSelector(state => state.fileReducer.files)
    const parentId = useSelector(state => state.fileReducer.parentId)
    const filesStyle = useSelector(state => state.fileReducer.filesStyle)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getFiles(parentId))
    }, [])



    if(filesStyle == "list") {
        return (
            <div className="files-list">
                <div className="files-list-header">
                    <div className="files-list-header-name">Название</div>
                    <div className="files-list-header-date">Дата</div>
                    <div className="files-list-header-size">Размер</div>
                </div>
                {files.map(file=>
                    <File key={file.id} file={file}/>
                )}
            </div>
        );
    }

    if(filesStyle == "small-plate") {
        return (
            <div className="files-small-plate">
                {files.map(file=>
                    <File key={file.id} file={file}/>
                )}
            </div>
        );
    }

};

export default Files;