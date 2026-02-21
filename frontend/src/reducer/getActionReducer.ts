import type { GetChatHistoryAction } from "../action/getHistoryAction";

interface GetChatHistoryState {
    loading: boolean,
    data: any,
    error: any
}
export const getActionReducer = (state: GetChatHistoryState, action: GetChatHistoryAction) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "GET_SUCCESS_HISTORY":
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case "GET_FAILURE_HISTORY":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}



