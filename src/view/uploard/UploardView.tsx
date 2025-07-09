import React, { useRef } from "react";
import { Button } from "@mui/material";
import CameraIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

export default function UploardView() {
  const handleFileSelect = (file: File) => {
    console.log(file);
  };
  return (
    <div>
      <ImageUpload onFileSelect={handleFileSelect} />
    </div>
  );
}

const ImageUpload = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        startIcon={<CameraIcon />}
        onClick={() => cameraInputRef.current?.click()}
      >
        Take Photo
      </Button>
      <Button
        variant="contained"
        startIcon={<PhotoLibraryIcon />}
        onClick={() => galleryInputRef.current?.click()}
        sx={{ mt: 1 }}
      >
        Choose from Gallery
      </Button>
    </div>
  );
};
