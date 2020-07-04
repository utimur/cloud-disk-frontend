import React, {useEffect, useState} from 'react';
import "./diskSettings.css";
import {useDispatch, useSelector} from "react-redux";
import {createDir, getFilesOrderByName, getFilesOrderByType, getFilesOrderByDate} from "../../../../actions/file";
import {setCreateDirVisible, setDescOrder, setFileStyle} from "../../../../reducers/fileReducer";
import listActiveLogo from '../../../../assets/img/button-list-active.svg'
import listLogo from '../../../../assets/img/button-list.svg'
import smallPlateLogo from '../../../../assets/img/button-small-plate.svg'
import smallPlateActiveLogo from '../../../../assets/img/button-small-plate-active.svg'
import bigPlateLogo from '../../../../assets/img/button-big-plate.svg'
import bigPlateActiveLogo from "../../../../assets/img/button-big-plate-active.svg"
import orderLogo from '../../../../assets/img/button-sort-order.svg'
import orderDescLogo from '../../../../assets/img/button-sort-order-desc.svg'

const DiskSettings = () => {

    const dispatch = useDispatch()
    const filesStyle = useSelector(state => state.fileReducer.filesStyle);
    const parentId = useSelector(state => state.fileReducer.parentId);
    const descOrder = useSelector(state => state.fileReducer.descOrder);
    const [selectValue, setSelectValue] = useState("type")

    function createNewDirClick(parentId) {
        dispatch(setCreateDirVisible("flex"));
    }

    function selectOnChange(e) {
        setSelectValue(e.target.value)
    }

    useEffect(()=>{
        switch (selectValue) {
            case "name":
                dispatch(getFilesOrderByName(parentId, descOrder))
                break
            case "type":
                dispatch(getFilesOrderByType(parentId, descOrder))
                break
            case "date":
                dispatch(getFilesOrderByDate(parentId, descOrder))
                break
        }
    }, [descOrder, selectValue])

    return (
        <div className="settings">
            <div className="settings-create">
                <button onClick={()=>createNewDirClick()} className="settings-create-btn">Создать новую папку</button>
            </div>
            <img src={descOrder ? orderDescLogo : orderLogo} onClick={()=>dispatch(setDescOrder(!descOrder))} className="settings-order-btn"/>
            <select className="settings-sort-list" onChange={(e)=>selectOnChange(e)}>
                <option value="name">По имени</option>
                <option selected={true} value="type">По типу</option>
                <option value="date">По дате создания</option>
            </select>
            <img src={filesStyle === "big-plate"? bigPlateActiveLogo : bigPlateLogo} onClick={() => dispatch(setFileStyle("big-plate"))} className="settings-big-plate-btn"/>
            <img src={filesStyle == "small-plate" ? smallPlateActiveLogo : smallPlateLogo} className="settings-small-plate-btn" onClick={()=>dispatch(setFileStyle("small-plate"))}/>
            <img src={filesStyle == "list" ? listActiveLogo : listLogo} className="settings-list-btn"  onClick={()=>dispatch(setFileStyle("list"))}/>
        </div>
    );
};

export default DiskSettings;