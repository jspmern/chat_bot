
import axiosInstance from "./axiosInstance"
 
interface Message {
  id?: number;
  msg: string;
  sender: string;
}
interface SaveMessagePayload{
    sessionId:string,
    messages:Message[],
    endedAt?:string,
    user:string
}

export const chatApi={
    sendMessage:(message:string)=>{
       return axiosInstance.post('api/chat',{message})
    },
    saveMessage:(payload:SaveMessagePayload)=>{
        return axiosInstance.post('api/save',payload)
    },
    getAllChatHistory:(user?:string)=>{
        return axiosInstance.get(`api/getAllChat?user=${user?user:"utsavmaithili@gmail.com"}`)
    },
    uploadFileForChat:(payload:any)=>{
        return axiosInstance.post('/api/upload-file',payload,{headers: {
             "Content-Type": "multipart/form-data",
           }})
    }
}