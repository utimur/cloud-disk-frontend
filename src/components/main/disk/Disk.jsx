import React, {useEffect, useState} from 'react';
import "./disk.css";
import DiskSettings from "./diskSettings/DiskSettings";
import Files from "./files/Files";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../../actions/file";

const Disk = () => {
    const dispatch = useDispatch()
    const parentId = useSelector(state => state.fileReducer.parentId)
    const [dragEnter, setDragEnter] = useState(false)

    useEffect(()=>{
        dispatch(getFiles(parentId))
    }, [parentId])

    function dragEnterFunc(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dragLeave(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    function dragOver(e) {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    function dropFile(event) {
        event.preventDefault()
        event.stopPropagation()
        let dt = event.dataTransfer
        let files = [...dt.files]
        files.forEach(file => dispatch(uploadFile(file, parentId)))
        setDragEnter(false)
        console.log(files)
    }


    return ( dragEnter == false ?
        <div onDragEnter={(e)=>dragEnterFunc(e)} onDragOver={(e)=>dragOver(e)} onDragLeave={dragLeave} className="disk">
            <div className="disk-header">
                <div className="disk-header-back">
                    <button className="disk-header-back-btn"/>
                </div>
                <div className="disk-header-name">Videos</div>
            </div>
            <DiskSettings/>
            <Files/>
        </div>
            :
            <div onDrop={dropFile} onDragOver={e =>dragOver(e)} onDragStart={(e)=>e.preventDefault()} className="drop-area" onDragLeave={(e)=>dragLeave(e)}>
               Перетащите файл в выделеную область для загрузки
            </div>
    );
};

export default Disk;