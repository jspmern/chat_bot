import { Paper, Box, Typography, IconButton } from "@mui/material";
import TextBox from "../component/TextBox"
import { useEffect, useState } from "react";
import { useChat } from "../hook/useChat";
import ChatCard from "../component/ChatCard";
import Loading from "../component/Loading";
import SwitchControl from "../component/SwitchControl";
import MenuIcon from "@mui/icons-material/Menu";
import ChatHistoryDrawer from "../component/ChatHistoryDrawer";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useHistory } from "../hook/useHistory";
interface Message {
  id: number;
  msg: string;
  sender: string;
}
interface ChatBotProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}
const ChatBot = ({mode,setMode}:ChatBotProps) => {
  const [text,setText]=useState('')
  const[loading,setLoading]=useState(false)
  const [messages,setMessages]=useState<Message[]>([])
   const [drawerOpen,setDrawerOpen]=useState(false)
  const {sendMessage:sendMessageApi,saveMessage}=useChat()
  const sessionIdRef = useRef(uuidv4());
  const history=useHistory()
  const onChangeHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value)
  }
  const clickHandler=async()=>{
    const textObj={id:new Date().getMilliseconds(),msg:text,sender:'user'}
    setMessages((pre)=>[...pre,textObj])
    setLoading(true)
    setText('')
    console.log("Sending message:", messages);
   const response= await sendMessageApi(text + messages.map(m=>m?.msg||"").join("\n \n"))
   setLoading(false)
   const responseObj={id:new Date().getMilliseconds(),msg:response.message,sender:'bot'}
   setMessages((pre)=>[...pre,responseObj])
 
  }
   const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const saveSessionToDB= async()=>
  {

      const payload={
       sessionId:history?.state.session_id ? history.state.session_id :
       sessionIdRef.current,
        user:"utsavmaithili@gmail.com",
        messages: messages,
        endedAt:new Date().toISOString()
      }
      saveMessage(payload)
  }
  useEffect(()=>{
    const handleSave=()=>{
      saveSessionToDB()
    }
    window.addEventListener("beforeunload",handleSave)
    return ()=>{
      window.removeEventListener("beforeunload",handleSave)
    }
  },[messages])
  useEffect(()=>{
     console.log("History state updated:", history?.state
);
     if(history?.state?.HistoryByUser && history?.state?.HistoryByUser.length > 0) {
      setMessages(history.state.HistoryByUser)
     }
  },[history?.state])

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <ChatHistoryDrawer open={drawerOpen} onClose={toggleDrawer(false)} />
    <Paper
      elevation={4}
      sx={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // 🔥 key fix
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton 
            onClick={toggleDrawer(true)}
            size="small"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        <Typography variant="h6" sx={{ flex: 1, textAlign: "center"}}>💬 ChatBot</Typography>
         <Box sx={{ width: 40 }}>
            <SwitchControl mode={mode} setMode={setMode}/>
          </Box>
      </Box>

      {/* Messages area */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          wordBreak: "break-word",
        }}
      >
       
        {messages.length>0&& messages.map((msgObj)=><ChatCard key={msgObj.id}  {...msgObj}/>)}
         {loading && <Loading/>} 
      </Box>

      {/* Input box */}
      <Box
        sx={{
          p: 1, 
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <TextBox text={text} onChangeHandler={onChangeHandler} clickHandler={clickHandler}/>
      </Box>
    </Paper>
    </Box>
  );
};

export default ChatBot;
