import { Button, Box, CircularProgress } from "@mui/material";
import CameraIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useRef } from "react";

function ImageUploard({
  onFileSelect,
  isUploading,
  isMobile,
}: {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  isMobile: boolean;
}) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      event.target.value = "";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 2,
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        ref={cameraInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
        aria-hidden="true"
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={galleryInputRef}
        onChange={handleFileChange}
        disabled={isUploading}
        aria-hidden="true"
      />
      <Button
        variant="contained"
        startIcon={
          isUploading ? <CircularProgress size={20} /> : <CameraIcon />
        }
        onClick={() => cameraInputRef.current?.click()}
        disabled={isUploading}
        sx={{ flex: isMobile ? 1 : "initial" }}
        aria-label="Take photo with camera"
      >
        {isUploading ? "Uploading..." : "Take Photo"}
      </Button>
      <Button
        variant="outlined"
        startIcon={
          isUploading ? <CircularProgress size={20} /> : <PhotoLibraryIcon />
        }
        onClick={() => galleryInputRef.current?.click()}
        disabled={isUploading}
        sx={{ flex: isMobile ? 1 : "initial" }}
        aria-label="Choose image from gallery"
      >
        Choose from Gallery
      </Button>
    </Box>
  );
}
export default ImageUploard;
