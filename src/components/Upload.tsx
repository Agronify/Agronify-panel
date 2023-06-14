import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import React from "react";

interface Props {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  type: string;
  setResUpload: React.Dispatch<React.SetStateAction<any>>;
  inputProps?: any;
}

export default function UploadFile(props: Props) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const controller = new AbortController();
  const handleUpload = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    setUploading(true);
    const res = await axiosInstance.post("/upload", formData, {
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded / progressEvent.total!);
        if (progressEvent.loaded === progressEvent.total) {
        }
      },
      signal: controller.signal,
    });
    setUploading(false);
    props.setResUpload(res.data);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
        <MuiFileInput
          required
          sx={{
            width: "100%",
          }}
          value={props.file}
          placeholder="Upload Image"
          onChange={(e) => props.setFile(e!)}
          inputProps={props.inputProps}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (uploading) {
              controller.abort();
              setUploading(false);
              setProgress(0);
            } else {
              handleUpload(props.file!, props.type);
            }
          }}
        >
          {uploading ? "Cancel" : props.file ? "Upload" : "Select"}
        </Button>
      </Box>
      {uploading && (
        <LinearProgress variant="determinate" value={progress * 100} />
      )}
    </>
  );
}
