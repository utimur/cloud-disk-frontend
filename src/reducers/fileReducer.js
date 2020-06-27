const SET_FILES = "SET_FILES"
const ADD_NEW_FILE = "ADD_NEW_FILE"
const SET_CREATE_DIR_VISIBLE = "SET_CREATE_DIR_VISIBLE"
const SET_UPLOADER_DiSPLAY = "SET_UPLOADER_DiSPLAY"
const ADD_UPLOADING_FILE = "ADD_UPLOADING_FILE"
const CHANGE_UPLOADING_PROGRESS = "CHANGE_UPLOADING_PROGRESS"

const defaultState = {
    files: [],
    parentId: null,
    createDirVisible:"none",
    uploaderDisplay: "none",
    uploadingFiles: []
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case ADD_NEW_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case SET_CREATE_DIR_VISIBLE:
            return {
                ...state,
                createDirVisible: action.payload
            }
        case SET_UPLOADER_DiSPLAY:
            return {
                ...state,
                uploaderDisplay: action.payload
            }
        case ADD_UPLOADING_FILE:
            return {
                ...state,
                uploadingFiles:[...state.uploadingFiles, action.payload]
            }
        case CHANGE_UPLOADING_PROGRESS:
            return {
                ...state,
                uploadingFiles:[...state.uploadingFiles.map(file => file.name == action.payload.name ? {...file, progress:action.payload.progress} : {...file})]
            }
        default:
            return state

    }
}

export const setFiles = (files) => ({type:SET_FILES, payload:files})
export const addNewFile = (dir) => ({type:ADD_NEW_FILE, payload:dir})
export const setCreateDirVisible = (display) => ({type:SET_CREATE_DIR_VISIBLE, payload:display})
export const setUploaderDisplay = (display) => ({type:SET_UPLOADER_DiSPLAY, payload:display})
export const addUploadingFile = (file) => ({type:ADD_UPLOADING_FILE, payload:file})
export const changeUploadingProgress = (file) => ({type:CHANGE_UPLOADING_PROGRESS, payload:file})