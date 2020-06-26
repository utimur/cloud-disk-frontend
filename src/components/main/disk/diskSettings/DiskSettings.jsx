import React from 'react';
import "./diskSettings.css";
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../../../actions/file";
import {setCreateDirVisible} from "../../../../reducers/fileReducer";

const DiskSettings = () => {

    const dispatch = useDispatch()

    function createNewDirClick(parentId) {
        dispatch(setCreateDirVisible("flex"));
    }

    return (
        <div className="settings">
            <div className="settings-create">
                <button onClick={()=>createNewDirClick()} className="settings-create-btn">Создать новую папку</button>
            </div>
            <button className="settings-order-btn"/>
            <select className="settings-sort-list">
                <option>По имени</option>
                <option>По типу</option>
                <option>По дате создания</option>
            </select>
            <button className="settings-big-plate-btn"/>
            <button className="settings-small-plate-btn"/>
            <button className="settings-list-btn"/>
        </div>
    );
};

export default DiskSettings;