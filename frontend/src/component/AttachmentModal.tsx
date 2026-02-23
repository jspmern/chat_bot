// ...existing code...
import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function AttachmentModal({ onUpload = (f) => console.log(f), icon = "clip", accept = "*" }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFile(null);
    setOpen(false);
  };

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    handleFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    await onUpload(file);
    handleClose();
  };

  const Icon = icon === "pin" ? PushPinIcon : AttachFileIcon;

  return (
    <>
      <IconButton onClick={handleOpen} color="primary" aria-label="attach">
        <Icon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              sx={{
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => inputRef.current?.click()}
            >
              <Typography variant="body1">Drag & drop a file here or click to choose</Typography>
              <Typography variant="caption" color="text.secondary">
                {accept === "*" ? "Any file type" : `Allowed: ${accept}`}
              </Typography>
            </Box>

            <input
              ref={inputRef}
              type="file"
              accept={accept}
              style={{ display: "none" }}
              onChange={onFileChange}
            />

            <Box>
              <Typography variant="body2">
                Selected: {file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : "No file"}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpload} disabled={!file}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
 