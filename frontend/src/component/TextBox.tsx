import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachmentModal from "./AttachmentModal";
interface Props {
  text: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
}
const TextBox = ({text,onChangeHandler,clickHandler}:Props) => {
   const handleUpload = async (file) => {
    // replace with your upload logic (fetch/axios/formdata)
    console.log("Uploading", file);
    // example: await uploadToServer(file);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
        <div style={{ padding: 24 }}>
      <AttachmentModal onUpload={handleUpload} icon="clip" accept=".pdf,.docx,.png,.jpg" />
      {/* use icon="pin" to show a pin instead of clip */}
    </div>
      <TextField
        value={text}
        onChange={onChangeHandler}
        placeholder="Type a message..."
        multiline
        maxRows={4}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            boxSizing: "border-box",
            minWidth: 0, // 🔥 MOST IMPORTANT FIX
          },
        }}
      />

      <IconButton color="primary" onClick={clickHandler} disabled={!text.trim()}>
        <SendIcon  />
      </IconButton>
    </Box>
  );
};

export default TextBox