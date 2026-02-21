import { Container, Box, ThemeProvider, CssBaseline } from "@mui/material";
import ChatBot from './pages/ChatBot';
import { useMemo, useState } from "react";
import { getTheme } from "./theme";
import GetChatContextProvider from "./context/GetAllHistoryContext";
 

function App() {
    const [mode, setMode] = useState<"light" | "dark">(() => {
      const savedMode = localStorage.getItem('mode');
      return savedMode === 'dark' ? 'dark' : 'light';
    });

  // ✅ Prevent unnecessary theme recreation
  const theme = useMemo(() => getTheme(mode), [mode])
  return (
   
    <GetChatContextProvider> 
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       <ThemeProvider theme={theme}>
      {/* ✅ Applies background + text color automatically */}
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <ChatBot mode={mode} setMode={setMode}/>
      </Box>
      </ThemeProvider>
    </Container>
    </GetChatContextProvider>
      
  );
}

export default App;
