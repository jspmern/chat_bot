 import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";

interface Attachment {
  fileId: string;
  fileUrl: string;
  fileName: string;
}

interface ChatCardProps {
  id: number;
  msg: string;
  sender: string;
  attachments: Attachment[];
}

function ChatCard({ msg, sender, attachments }: ChatCardProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const baseUrl = "http://localhost:8000/uploads";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: sender === "user" ? "flex-end" : "flex-start",
          mt: 2,
          gap: 1,
        }}
      >
        {/* 🔥 Attachments Preview */}
        {attachments?.length > 0 &&
          attachments.map((file) => {
            const fileUrl = `${baseUrl}/${file.fileName}`;
            const isImage = file.fileName?.match(
              /\.(jpg|jpeg|png|gif)$/i
            );

            return (
              <Box
                key={file.fileId}
                sx={{
                  position: "relative",
                  maxWidth: 250,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                  bgcolor: "background.paper",
                }}
              >
                {isImage ? (
                  <img
                    src={fileUrl}
                    alt={file.fileName}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body2">📄</Typography>
                    <Typography
                      variant="body2"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {file.fileName}
                    </Typography>
                  </Box>
                )}

                {/* 🔥 Cancel Button UI (No functionality) */}
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            );
          })}

        {/* 🔥 Message Bubble */}
        {msg && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              maxWidth: "70%",
              bgcolor:
                sender === "user"
                  ? "#f0f0f0"
                  : "transparent",
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "#fff"
                  : "text.primary",
            }}
          >
            {msg}
          </Box>
        )}
      </Box>

      <div ref={messagesEndRef} />
    </>
  );
}

export default ChatCard;