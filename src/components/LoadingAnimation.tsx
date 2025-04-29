import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
interface LoadingAnimationProps {
  loadingMsg: string;
}
export default function LoadingAnimation({
  loadingMsg,
}: LoadingAnimationProps) {
  return (
    <div>
      <Box
        component={motion.div}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
        sx={{
          display: "flex",
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              component={motion.div}
              key={index}
              variants={loadingCircleVariants}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              sx={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor: "primary.main",
              }}
            />
          ))}
        </Box>
        <Typography>{loadingMsg}</Typography>
      </Box>
    </div>
  );
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
      duration: 1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
      duration: 1,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};
