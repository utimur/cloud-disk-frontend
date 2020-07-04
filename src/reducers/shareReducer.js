const SET_IS_SHARE_VISIBLE = "SET_IS_SHARE_VISIBLE"

const defaultState = {
    shareLink:"",
    isShareVisible:"none"
}


export default function shareReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_IS_SHARE_VISIBLE:
            return {
                ...state,
                isShareVisible: action.payload
            }

        default:
            return state

    }
}

export const setIsShareVisible = (display) => ({type:SET_IS_SHARE_VISIBLE, payload:display})
