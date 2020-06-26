import React, {useEffect} from 'react';
import "./disk.css";
import DiskSettings from "./diskSettings/DiskSettings";
import Files from "./files/Files";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../../actions/file";

const Disk = () => {
    const dispatch = useDispatch()
    const parentId = useSelector(state => state.fileReducer.parentId)

    useEffect(()=>{
        dispatch(getFiles(parentId))
    }, [parentId])

    return (
        <div className="disk">
            <div className="disk-header">
                <div className="disk-header-back">
                    <button className="disk-header-back-btn"/>
                </div>
                <div className="disk-header-name">Videos</div>
            </div>
            <DiskSettings/>
            <Files/>
        </div>
    );
};

export default Disk;