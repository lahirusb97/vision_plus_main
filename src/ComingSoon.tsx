import { PanToolAltTwoTone } from "@mui/icons-material";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Comming Soon <PanToolAltTwoTone />
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            We're working hard to bring you something amazing!
          </Typography>
          <Box mt={2}>
            <CircularProgress color="primary" />
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
