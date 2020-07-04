import React, {useEffect} from 'react';
import "./files.css"
import File from "./file/File";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../../actions/file";

const Files = () => {

    const files = useSelector(state => state.fileReducer.files)
    const parentId = useSelector(state => state.fileReducer.parentId)
    const isSearch = useSelector(state => state.fileReducer.isSearch)
    const filesStyle = useSelector(state => state.fileReducer.filesStyle)
    const dispatch = useDispatch()


    // useEffect(()=>{
    //     dispatch(getFiles(parentId))
    // }, [])


    if (isSearch == true) {
        return (
            <div className="search-fetching">
                <div className="search-fetching-circle">
                </div>
            </div>
        )
    }


    if (files.length == 0) {
        return (
            <div className="files-empty">
                Файлы не найдены
            </div>
        );
    }


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

    if(filesStyle === "small-plate" || filesStyle === "big-plate") {
        return (
            <div className="files-plate">
                {files.map(file=>
                    <File key={file.id} file={file}/>
                )}
            </div>
        );
    }

};

export default Files;