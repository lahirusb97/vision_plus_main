import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { getUserAuth, saveUserCurentBranch } from "../utils/authDataConver";
import { useNavigate } from "react-router";

export default function SelectBrancheIndex() {
  const userAuth = getUserAuth();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        Width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5"> Select your branche</Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              width: 300,
              padding: 2,
              margin: 2,
              cursor: "pointer",
            }}
            key={branch.id}
          >
            <Typography variant="h6"> {branch.branch_name}</Typography>
          </Button>
        ))}
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate("/login")}
        >
          Back To Login
        </Button>
      </Box>
    </Box>
  );
}
