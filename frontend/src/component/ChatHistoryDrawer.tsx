 import { Drawer, Box, Typography, List, ListItem, ListItemButton, Divider, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "../hook/useHistory";
import { useEffect, useState } from "react";

interface ChatHistoryDrawerProps {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

interface ChatSession {
  _id?: string;
  sessionId: string;
  title?: string;
  endedAt: string;
  messages: Array<{
    id?: number;
    msg: string;
    sender: string;
  }>;
  user: string;
}

const ChatHistoryDrawer = ({ open, onClose }: ChatHistoryDrawerProps) => {
  const history = useHistory();
  const state = history?.state;
  const [localLoading, setLocalLoading] = useState(false);
  
  useEffect(() => {
    if (open && state?.loading) {
      setLocalLoading(true);
    } else if (!state?.loading) {
      setLocalLoading(false);
    }
  }, [open, state?.loading]);

  const formatTimestamp = (isoString: string): string => {
    try {
      const date = new Date(isoString);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const isToday = date.toDateString() === today.toDateString();
      const isYesterday = date.toDateString() === yesterday.toDateString();

      const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      if (isToday) return `Today ${timeString}`;
      if (isYesterday) return `Yesterday ${timeString}`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    } catch (error) {
      return "Unknown date";
    }
  };

  const getFirstMessage = (messages: ChatSession["messages"]): string => {
    try {
      if (messages && Array.isArray(messages) && messages.length > 0) {
        const firstUserMessage = messages.find((msg) => msg?.sender === "user");
        if (firstUserMessage?.msg) {
          return firstUserMessage.msg.length > 50 
            ? firstUserMessage.msg.substring(0, 50) + "..." 
            : firstUserMessage.msg;
        }
      }
    } catch (error) {
      console.error("Error getting first message:", error);
    }
    return "New Chat";
  };

  const chatHistory: ChatSession[] = Array.isArray(state?.data) 
    ? state.data 
    : state?.data?.messages && Array.isArray(state.data.messages)
    ? state.data.messages
    : [];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Chat History
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ flex: 1, overflowY: "auto" }}>
        {localLoading || state?.loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress size={50} />
            <Typography variant="body2" sx={{ color: "#999" }}>
              Loading chat history...
            </Typography>
          </Box>
        ) : state?.error ? (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" sx={{ color: "#d32f2f", textAlign: "center" }}>
              Error loading chat history
            </Typography>
            <Typography variant="caption" sx={{ color: "#999", display: "block", mt: 1, textAlign: "center" }}>
              {state.error?.message || "Please try again later"}
            </Typography>
          </Box>
        ) : chatHistory && chatHistory.length > 0 ? (
          chatHistory.map((chat) => {
            const firstMessage = getFirstMessage(chat.messages);
            const timestamp = formatTimestamp(chat.endedAt);
            
            return (
              <ListItem key={chat.sessionId || chat._id} disablePadding>
                <ListItemButton
                  sx={{
                    py: 1.5,
                    px: 2,
                    borderBottom: "1px solid #f0f0f0",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mb: 0.5,
                      }}
                      title={firstMessage}
                    >
                      {firstMessage}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#999" }}>
                      {timestamp}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" sx={{ color: "#999", textAlign: "center" }}>
              No chat history yet
            </Typography>
          </Box>
        )}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#666",
            cursor: "pointer",
            "&:hover": { color: "#000" },
          }}
        >
          Clear History
        </Typography>
      </Box>
    </Drawer>
  );
};

export default ChatHistoryDrawer;