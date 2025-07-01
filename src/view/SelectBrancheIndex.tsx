import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import { getUserAuth, saveUserCurentBranch } from "../utils/authDataConver";
import { useNavigate } from "react-router";
import { Bus, Hospital, ShoppingCart } from "lucide-react";

export default function SelectBrancheIndex() {
  const userAuth = getUserAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          minWidth: 320,
          maxWidth: "95vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Select Your Branch
        </Typography>
        <Divider sx={{ width: "100%", mb: 1 }} />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {userAuth?.branches?.map((branch, index) => (
            <Button
              data-testid={`branch-button-${index}`}
              onClick={() => {
                const currentBranch = saveUserCurentBranch(branch);
                if (currentBranch) {
                  navigate("/");
                }
              }}
              variant="outlined"
              sx={{
                width: "100%",
                fontWeight: 500,
                fontSize: 15,
                px: 1.5,
                py: 0.75,
                my: 0.5,
                borderRadius: 2,
                justifyContent: "flex-start",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
              key={branch.id}
            >
              <span style={{ marginRight: 10 }}>
                {" "}
                {branch.id === 3 ? <Bus size={20} /> : <Hospital size={20} />}
              </span>
              <span>{branch.branch_name}</span>
            </Button>
          ))}
        </Box>
        <Divider sx={{ width: "100%", my: 1 }} />
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/login")}
          sx={{
            width: "100%",
            fontWeight: 500,
            fontSize: 14,
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Back To Login
        </Button>
      </Paper>
    </Box>
  );
}
