import { styled } from "@mui/material/styles";
import { IconButton, IconButtonProps } from "@mui/material";
import theme from "../theme/theme";

interface CustomIconButtonProps extends IconButtonProps {
  variant?: "outlined" | "filled" | "ghost";
}

const CustomIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "variant",
})<CustomIconButtonProps>(({ variant = "outlined" }) => ({
  width: 44,
  height: 44,
  borderRadius: theme.shape.borderRadius * 2,
  transition: "all 0.2s ease",

  ...(variant === "outlined" && {
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.grey[700],
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[100],
      borderColor: theme.palette.grey[300],
      color: theme.palette.grey[400],
    },
  }),

  ...(variant === "filled" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[500],
      border: `1px solid ${theme.palette.grey[300]}`,
    },
  }),

  ...(variant === "ghost" && {
    backgroundColor: "transparent",
    border: "none",
    color: theme.palette.grey[700],
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.primary.main,
    },
    "&.Mui-disabled": {
      color: theme.palette.grey[400],
      backgroundColor: "transparent",
    },
  }),
}));

export default CustomIconButton;
