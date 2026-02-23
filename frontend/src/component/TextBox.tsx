import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentModal from "./AttachmentModal";
interface Props {
text: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
  handleUpload: (file: File) => void;
  files: any[]; // ✅ ADD THIS
}
const TextBox = ({text,onChangeHandler,clickHandler,handleUpload,files}:Props) => {
  return (
  <Box sx={{ width: "100%" }}>

    {/* 🔥 Preview Section */}
    {files.length > 0 && (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 1,
          flexWrap: "wrap"
        }}
      >
        {files.map((file: any, index: number) => {
          const isImage =
            file.fileName
?.match(/\.(jpeg|jpg|png|gif)$/i);

          return (
            <Box
              key={index}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 1,
                width: 120,
                textAlign: "center",
                bgcolor: "background.paper",
                boxShadow: 1
              }}
            >
              {isImage ? (
                <img
                  src={`http://localhost:8000/uploads/${file.fileName}`
}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8
                  }}
                />
              ) : (
                <Box>
                  <Typography variant="body2">
                    📄 PDF
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    )}

    {/* 🔥 Input Row */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1
      }}
    >
      <AttachmentModal
        onUpload={handleUpload}
        icon="clip"
        accept=".pdf,.docx,.png,.jpg"
      />

      <TextField
        value={text}
        onChange={onChangeHandler}
        placeholder="Type a message..."
        multiline
        maxRows={4}
        fullWidth
      />

      <IconButton
        color="primary"
        onClick={clickHandler}
        disabled={!text.trim() && files.length === 0}
      >
        <SendIcon />
      </IconButton>
    </Box>
  </Box>
);
};

export default TextBox