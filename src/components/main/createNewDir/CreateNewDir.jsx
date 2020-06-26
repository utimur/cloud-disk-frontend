import React, {useState} from 'react';
import "./createNewDir.css"
import Input from "../../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {createDir} from "../../../actions/file";
import {setCreateDirVisible} from "../../../reducers/fileReducer";


const CreateNewDir = () => {

    const createDirVisible = useSelector(state => state.fileReducer.createDirVisible)
    const dispatch = useDispatch()
    const parentId = useSelector(state => state.fileReducer.parentId)
    const [dirName, setDirName] = useState("")

    function createNewDirClick(parentId) {
        dispatch(createDir(parentId, dirName))
        dispatch(setCreateDirVisible("none"))
    }

    function closeClick() {
        dispatch(setCreateDirVisible("none"))
    }

    return (
        <div className="create-dir" style={{display:createDirVisible}}>
            <div className="header">
                <div className="header-name">Создать новую папку</div>
                <div className="header-close">
                    <button className="header-close-btn" onClick={()=>closeClick()}/>
                </div>
            </div>
            <Input value={dirName} setValue={setDirName} type="text" placeholder="Введите название папки"/>
            <button className="create-btn" onClick={()=>createNewDirClick(parentId)}>Создать</button>
        </div>
    );
};

export default CreateNewDir;