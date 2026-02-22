import type { GetChatHistoryAction } from "../action/getHistoryAction";

interface GetChatHistoryState {
    loading: boolean,
    data: any,
    session_id: string | undefined,
    HistoryByUser: any[],
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
            case "FIND_USER_HISTORY":
                console.log("Finding user history for session ID:", action.payload,state.data);
                if(!action.payload) return state;  
                const userHistory = state.data?.find((session: any) => session.sessionId === action.payload);
                console.log("User history found:", userHistory);
                return{
                    ...state,
                    session_id: action.payload,
                    HistoryByUser: userHistory?.messages || []
                }
        default: return state
    }
}



