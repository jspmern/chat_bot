import { useContext } from "react"
import { GetChatContext } from "../context/GetAllHistoryContext"

export const useHistory=()=>{
     return useContext(GetChatContext)
}