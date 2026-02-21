import { chatApi } from "../api/chatApi"
interface Message {
  id?: number;
  msg: string;
  sender: string;
}
interface SaveMessagePayload{
    sessionId:string,
    user:string,
    messages:Message[],
    endedAt?:string
}
export const useChat=()=>{
    const sendMessage=async(message:string)=>{
        try {
            const response=await chatApi.sendMessage(message)
            return response.data
        } catch (error) {
            console.error("Error sending message:", error)
            throw error
        }
 }
 const saveMessage=async(payload:SaveMessagePayload)=>{
    try{
        const response=await chatApi.saveMessage(payload)
        return response.data
        
    }
    catch(error)
     {
        console.error("Error saving message:", error)
        throw error
     }
 }
 const getAllChatHistory=async(user:string)=>{
    try{
        const response=await chatApi.getAllChatHistory(user)
        return response.data}
        catch(error){
        console.error("Error fetching chat history:", error)
        throw error
        }
 }
 return {sendMessage,saveMessage,getAllChatHistory}
}