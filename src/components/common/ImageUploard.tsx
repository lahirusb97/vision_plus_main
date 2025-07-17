import { Button, CircularProgress, Box, Typography } from "@mui/material";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import ErrorIcon from "@mui/icons-material/Error";
import { useRef, ChangeEvent } from "react";

export default function ImageUploard({
  onFileSelect,
  isUploading,
  isMobile,
  postHandlerError,
}: {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  isMobile: boolean;
  postHandlerError: boolean;
}) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      // Reset input value to allow selecting the same file again
      if (cameraInputRef.current) cameraInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={isUploading}
        aria-hidden="true"
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={isUploading}
        aria-hidden="true"
      />
      <Button
        variant="contained"
        startIcon={
          isUploading ? (
            <CircularProgress size={20} />
          ) : postHandlerError ? (
            <ErrorIcon color="error" />
          ) : (
            <CameraIcon />
          )
        }
        color={postHandlerError ? "error" : "primary"}
        onClick={() => cameraInputRef.current?.click()}
        disabled={isUploading}
        sx={{
          flex: isMobile ? 1 : "initial",
          border: postHandlerError ? "1px solid #f44336" : "none",
        }}
        aria-label="Take photo with camera"
      >
        {isUploading
          ? "Uploading..."
          : postHandlerError
          ? "Retry Take Photo"
          : "Take Photo"}
      </Button>
      <Button
        variant={postHandlerError ? "contained" : "outlined"}
        color={postHandlerError ? "error" : "primary"}
        startIcon={
          isUploading ? (
            <CircularProgress size={20} />
          ) : postHandlerError ? (
            <ErrorIcon color="error" />
          ) : (
            <PhotoLibraryIcon />
          )
        }
        onClick={() => galleryInputRef.current?.click()}
        disabled={isUploading}
        sx={{
          flex: isMobile ? 1 : "initial",
          border: postHandlerError
            ? "1px solid #f44336"
            : "1px solid rgba(0, 0, 0, 0.12)",
        }}
        aria-label="Choose image from gallery"
      >
        {postHandlerError ? "Retry from Gallery" : "Choose from Gallery"}
      </Button>
      {postHandlerError && (
        <Typography
          color="error"
          variant="caption"
          sx={{ mt: 1, display: "block" }}
        >
          Failed to upload. Please try again.
        </Typography>
      )}
    </Box>
  );
}
