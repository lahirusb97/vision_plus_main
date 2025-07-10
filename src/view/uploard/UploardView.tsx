import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import useGetOrderImages from "../../hooks/useGetOrderImages";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import ImageUploard from "../../components/common/ImageUploard";
import { useParams } from "react-router";
import axiosClient from "../../axiosClient";
import { useDeleteDialog } from "../../context/DeleteDialogContext";
import DialogImageFullScreen from "../../components/common/DialogOrderImage";
import { Fullscreen } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
export default function EnhancedUploadView() {
  const { order_id } = useParams<{ order_id: string }>();
  const { openDialog } = useDeleteDialog();
  const { orderImageList, orderImageListLoading, orderImageListRefresh } =
    useGetOrderImages({ order_id: Number(order_id) });
  const { postHandler, postHandlerloading, postHandlerError } = useAxiosPost();

  const [open, setOpen] = useState({
    open: false,
    image: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFileSelect = async (file: File) => {
    if (!order_id) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsUploading(true);
      await postHandler(`orders/${order_id}/images/`, formData);
      orderImageListRefresh();
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!order_id) return;

    try {
      await axiosClient.delete(`orders/${order_id}/images/${imageId}/`);
      orderImageListRefresh();
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "100vw", mx: "auto" }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Image Upload for Order #{order_id}
      </Typography>

      <ImageUploard
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
        isMobile={isMobile}
      />

      {orderImageList.length === 0 && !isUploading && (
        <Typography align="center" color="text.secondary" sx={{ my: 2 }}>
          No images uploaded yet
        </Typography>
      )}

      <Box
        sx={{
          mt: 2,
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        {orderImageList.map((img) => (
          <Box key={img.id} sx={{ flex: 1, minWidth: "300px" }}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <PhotoProvider>
                <PhotoView src={img.image}>
                  <CardMedia
                    onClick={() => {
                      setOpen({ open: true, image: img.image });
                    }}
                    component="img"
                    height="200"
                    image={img.image}
                    alt={`Image uploaded at ${new Date(
                      img.uploaded_at
                    ).toLocaleString()}`}
                    sx={{ objectFit: "contain", cursor: "pointer" }}
                  />
                </PhotoView>
              </PhotoProvider>
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  Uploaded: {new Date(img.uploaded_at).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActionArea
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <IconButton
                  size="small"
                  color="primary"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
                  }}
                  onClick={() => {
                    setOpen({ open: true, image: img.image });
                  }}
                  aria-label={`Delete image ${img.id}`}
                >
                  <Fullscreen fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
                  }}
                  onClick={() => {
                    openDialog(
                      `orders/${order_id}/images/${img.id}/`,
                      "",
                      "Image",
                      "Permanantly Delete",
                      orderImageListRefresh
                    );
                  }}
                  aria-label={`Delete image ${img.id}`}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
