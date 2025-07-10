import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  DialogContent,
} from "@mui/material";
import useGetOrderImages from "../../hooks/useGetOrderImages";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { DeleteIcon, Fullscreen } from "lucide-react";
import "react-photo-view/dist/react-photo-view.css";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogOrderImage({
  open,
  onClose,
  order_id,
}: {
  open: boolean;
  onClose: () => void;
  order_id: number | null;
}) {
  console.log(order_id);
  const { orderImageList, orderImageListLoading, orderImageListRefresh } =
    useGetOrderImages({ order_id: open ? order_id : null });
  const [fullScreenImage, setFullScreenImage] = React.useState<string | null>(
    null
  );
  const handleClose = () => {
    onClose();
  };
  console.log(orderImageList);
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Image
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            m: 2,
            maxWidth: 400,
            flexWrap: "wrap",
            display: "flex",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          {orderImageListLoading ? (
            <CircularProgress />
          ) : (
            orderImageList?.map((img) => (
              <Box key={img.id} sx={{ flex: 1, minWidth: "400px" }}>
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
                          setFullScreenImage(img.image);
                        }}
                        component="img"
                        width="400"
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
                        setFullScreenImage(img.image);
                      }}
                      aria-label={`Delete image ${img.id}`}
                    >
                      <Fullscreen fontSize="small" />
                    </IconButton>
                  </CardActionArea>
                </Card>
              </Box>
            ))
          )}
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
