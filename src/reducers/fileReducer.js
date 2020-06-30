const SET_FILES = "SET_FILES"
const ADD_NEW_FILE = "ADD_NEW_FILE"
const DELETE_FILE = "DELETE_FILE"
const SET_CREATE_DIR_VISIBLE = "SET_CREATE_DIR_VISIBLE"
const SET_UPLOADER_DiSPLAY = "SET_UPLOADER_DiSPLAY"
const ADD_UPLOADING_FILE = "ADD_UPLOADING_FILE"
const CHANGE_UPLOADING_PROGRESS = "CHANGE_UPLOADING_PROGRESS"
const SET_PARENT_ID = "SET_PARENT_ID"
const SET_FILES_STYLE = "SET_FILES_STYLE"
const SET_ORDER_DESK = "SET_ORDER_DESK"

const defaultState = {
    files: [],
    parentId: null,
    path:"/",
    backId: null,
    createDirVisible:"none",
    uploaderDisplay: "none",
    uploadingFiles: [],
    filesStyle: "small-plate",
    descOrder: false
}

export default function fileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload.files,
                backId: action.payload.backId,
                path: action.payload.path,
            }
        case ADD_NEW_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case DELETE_FILE:
            return {
                ...state,
                files: state.files.filter(file => file.id != action.payload.id)
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
        case SET_PARENT_ID:
            return {
                ...state,
                parentId: action.payload
            }
        case SET_FILES_STYLE:
            return {
                ...state,
                filesStyle: action.payload
            }
        case SET_ORDER_DESK:
            return {
                ...state,
                descOrder: action.payload
            }
        default:
            return state

    }
}

export const setFiles = (files) => ({type:SET_FILES, payload:files})
export const addNewFile = (dir) => ({type:ADD_NEW_FILE, payload:dir})
export const deleteFile = (file) => ({type:DELETE_FILE, payload:file})
export const setCreateDirVisible = (display) => ({type:SET_CREATE_DIR_VISIBLE, payload:display})
export const setUploaderDisplay = (display) => ({type:SET_UPLOADER_DiSPLAY, payload:display})
export const addUploadingFile = (file) => ({type:ADD_UPLOADING_FILE, payload:file})
export const changeUploadingProgress = (file) => ({type:CHANGE_UPLOADING_PROGRESS, payload:file})
export const setParentId = (parentId) => ({type:SET_PARENT_ID, payload:parentId})
export const setFileStyle = (style) => ({type:SET_FILES_STYLE, payload:style})
export const setDescOrder = (bool) => ({type:SET_ORDER_DESK, payload:bool})