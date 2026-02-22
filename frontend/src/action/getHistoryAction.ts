 export type GetChatHistoryAction= | { type: "LOADING" }
  | { type: "GET_SUCCESS_HISTORY",payload:any }
  | { type: "GET_FAILURE_HISTORY", payload?: any }
  | {type:"FIND_USER_HISTORY",payload:string}