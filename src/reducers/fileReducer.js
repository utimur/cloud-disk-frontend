const SET_FILES = "SET_FILES"
const ADD_NEW_FILE = "ADD_NEW_FILE"
const SET_CREATE_DIR_VISIBLE = "SET_CREATE_DIR_VISIBLE"

const defaultState = {
    files: [],
    parentId: null,
    createDirVisible:"none"
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
        default:
            return state

    }
}

export const setFiles = (files) => ({type:SET_FILES, payload:files})
export const addNewFile = (dir) => ({type:ADD_NEW_FILE, payload:dir})
export const setCreateDirVisible = (display) => ({type:SET_CREATE_DIR_VISIBLE, payload:display})