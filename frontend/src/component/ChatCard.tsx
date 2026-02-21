import { Box } from "@mui/material"
import { useEffect, useRef } from "react";
 interface ChatCardProps {
  id: number;
  msg: string;
  sender: string;
}

 function ChatCard({id,msg,sender}:ChatCardProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <>
     <div style={{display:"flex", flexDirection:"column",gap:2}}>
        {sender==="user" && <Box p={2} sx={{ backgroundColor: '#f0f0f0', borderRadius: 2, maxWidth: '70%', marginLeft: 'auto', mt: 2, color: (theme) => theme.palette.mode === 'dark' ? 'black' : 'text.primary' }}>
        {msg}
            </Box>}
      <br/>
      {sender==="bot" && <Box sx={{   maxWidth: '90%', marginRight: 'auto' }}> 
        {msg}
      </Box>}
     </div>
      <div ref={messagesEndRef} />
     </>
  )
}

export default ChatCard