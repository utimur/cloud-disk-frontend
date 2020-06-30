import React from 'react';
import "./diskSettings.css";
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../../../actions/file";
import {setCreateDirVisible, setFileStyle} from "../../../../reducers/fileReducer";
import listActiveLogo from '../../../../assets/img/button-list-active.svg'
import listLogo from '../../../../assets/img/button-list.svg'
import smallPlateLogo from '../../../../assets/img/button-small-plate.svg'
import smallPlateActiveLogo from '../../../../assets/img/button-small-plate-active.svg'
import bigPlateLogo from '../../../../assets/img/button-big-plate.svg'

const DiskSettings = () => {

    const dispatch = useDispatch()
    const filesStyle = useSelector(state => state.fileReducer.filesStyle);

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
            <img src={bigPlateLogo} className="settings-big-plate-btn"/>
            <img src={filesStyle == "small-plate" ? smallPlateActiveLogo : smallPlateLogo} className="settings-small-plate-btn" onClick={()=>dispatch(setFileStyle("small-plate"))}/>
            <img src={filesStyle == "list" ? listActiveLogo : listLogo} className="settings-list-btn"  onClick={()=>dispatch(setFileStyle("list"))}/>
        </div>
    );
};

export default DiskSettings;