import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const responce = location.state || {}; // Handle possible undefined state

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20, width: 300 }}>
            <Typography
              color="success"
              variant="h4"
              component="h1"
              gutterBottom
            >
              Success!
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Invoice Number
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {responce.id}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Order Details
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Total
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                ${responce.total_price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                onClick={() => navigate("/transaction")}
                color="error"
                variant="contained"
              >
                Exit
              </Button>
              <Button
                onClick={() => navigate("view")}
                color="info"
                variant="contained"
              >
                Show Invoice
              </Button>
              <Button color="success" variant="contained">
                Print
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuccessPage;
