const SET_FILES = "SET_FILES"
const CREATE_NEW_DIR = "CREATE_NEW_DIR"
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
        case CREATE_NEW_DIR:
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
export const createNewDir = (dir) => ({type:CREATE_NEW_DIR, payload:dir})
export const setCreateDirVisible = (display) => ({type:SET_CREATE_DIR_VISIBLE, payload:display})