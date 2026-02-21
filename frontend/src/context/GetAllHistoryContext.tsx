import { createContext, useEffect, useReducer } from "react"
import { getActionReducer } from "../reducer/getActionReducer";
import { chatApi } from "../api/chatApi";

interface GetChatHistoryState {
    loading: boolean,
    data: any,
    error: any
}
interface ChatContextType {
  state: GetChatHistoryState;
  dispatch: React.Dispatch<any>;
}
export const GetChatContext = createContext<ChatContextType | undefined>(
  undefined
);
const initialState: GetChatHistoryState = {
    loading: false,
    data: null,
    error: null
}

function GetChatContextProvider({ children }: { children: React.ReactNode }) {
    const[state,dispatch]=useReducer(getActionReducer,initialState)

    const fetchChatHistory=async()=>{
        try{
    dispatch({type:"LOADING"})
      const response=await chatApi.getAllChatHistory()
        if(response.status===200){
            dispatch({type:"GET_SUCCESS_HISTORY",payload:response.data.messages})
        }
        }
        catch(error){
            dispatch({type:"GET_FAILURE_HISTORY",payload:error})
        }

    }
    useEffect(()=>{
       fetchChatHistory()
    },[])

  return (
    <GetChatContext.Provider value={{ state, dispatch }}>
      {children}
    </GetChatContext.Provider>
  );
}

export default GetChatContextProvider