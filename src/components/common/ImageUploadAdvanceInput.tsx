import { useRef, useState, useEffect, useCallback } from "react";
import {
  IconButton,
  InputBase,
  Paper,
  Box,
  Tooltip,
  Badge,
  styled,
  InputAdornment,
} from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface ChatInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUploadAdvanceInput = <T extends FieldValues>({
  control,
  name,
  placeholder = "Type a message...",
}: ChatInputProps<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = useCallback(
    (file: File | null, onChange: (file: File | null) => void) => {
      // Revoke previous URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        // Create new preview URL
        const newUrl = URL.createObjectURL(file);
        setPreviewUrl(newUrl);
        onChange(file);
      } else {
        setPreviewUrl(null);
        onChange(null);
      }
    },
    [previewUrl]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent, onChange: (file: File | null) => void) => {
      const items = Array.from(e.clipboardData?.items || []);
      const imageItem = items.find((item) => item.type.startsWith("image/"));

      if (imageItem) {
        const file = imageItem.getAsFile();
        if (file) {
          handleFileChange(file, onChange);
          e.preventDefault();
        }
      }
    },
    [handleFileChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box sx={{ width: "100%", p: 1 }}>
          {/* Preview of selected file */}
          {value && previewUrl && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                overflowX: "auto",
                mb: 1,
                p: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleFileChange(null, onChange)}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    bgcolor: "background.paper",
                    p: 0.5,
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "24px",
            }}
            elevation={1}
          >
            <Tooltip title="Attach file">
              <span>
                <IconButton
                  component="label"
                  size="small"
                  sx={{ p: "8px", mx: 0.5 }}
                  disabled={!!value}
                >
                  <AttachFileIcon />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileChange(file, onChange);
                      e.target.value = "";
                    }}
                    ref={fileInputRef}
                    multiple={false}
                  />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Add image">
              <span>
                <IconButton
                  component="label"
                  size="small"
                  sx={{ p: "8px", mx: 0.5 }}
                  disabled={!!value}
                >
                  <ImageIcon />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileChange(file, onChange);
                      e.target.value = "";
                    }}
                    ref={imageInputRef}
                    multiple={false}
                  />
                </IconButton>
              </span>
            </Tooltip>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={placeholder}
              onKeyDown={handleKeyDown}
              onPaste={(e) => handlePaste(e, onChange)}
              multiline
              maxRows={4}
              startAdornment={
                value && (
                  <InputAdornment position="start">
                    <Badge badgeContent={1} color="primary">
                      <ImageIcon color="action" />
                    </Badge>
                  </InputAdornment>
                )
              }
            />
          </Paper>
        </Box>
      )}
    />
  );
};

export default ImageUploadAdvanceInput;
