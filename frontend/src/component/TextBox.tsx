import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
interface Props {
  text: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clickHandler: () => void;
}
const TextBox = ({text,onChangeHandler,clickHandler}:Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
      }}
    >
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