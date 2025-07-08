import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Image } from "lucide-react";
import { API_BASE_URL } from "../../data/staticVariables";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  minHeight: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ImageViewModel({
  image,
}: {
  image: string | null | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  ///.env vite import
  //img utl
  console.log("image", image);
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        View Image <Image />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* //close btn add */}

        <Box sx={style}>
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <Button color="error" onClick={handleClose}>
              Close
            </Button>
          </Box>
          <img
            style={{ width: "600px", height: "400px", objectFit: "contain" }}
            src={`${API_BASE_URL}${image}` || ""}
            alt=""
          />
        </Box>
      </Modal>
    </div>
  );
}
