import { Grid, Paper, Typography, Input } from "@mui/material";
import React from "react";

export default function EyeTestTable({ register }) {
  return (
    <div>
      <Paper elevation={3} sx={{ padding: "10px", marginY: "10px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
          }}
        >
          <Grid sx={{ gridRow: "span 2" }} item></Grid>
          <Grid item sx={{ gridColumn: "span 3" }}>
            <Typography sx={{ bgcolor: "#D7D4E1" }}> Right Eye</Typography>
          </Grid>
          <Grid
            item
            sx={{
              gridColumn: "span 3",
              padding: "10px",
            }}
          >
            <Typography sx={{ bgcolor: "#DBD4B5", textAlign: "center" }}>
              Left Eye
            </Typography>
          </Grid>
          {/* Right Eye */}
          <Typography>SPH</Typography>
          <Typography>Cyl</Typography>
          <Typography>AXIS</Typography>
          {/* Right Eye */}
          {/* Left Eye */}
          <Typography>SPH</Typography>
          <Typography>Cyl</Typography>
          <Typography>AXIS</Typography>
          <Typography textAlign="center">Dist</Typography>
          {/* Left Eye */}
          {/* Right Eye */}
          <Input type="number" {...register("right_eye_dist_sph")} />
          <Input type="number" {...register("right_eye_dist_cyl")} />
          <Input type="number" {...register("right_eye_dist_axis")} />
          {/* Right Eye */}

          {/* Left Eye */}
          <Input type="number" {...register("left_eye_dist_sph")} />
          <Input type="number" {...register("left_eye_dist_cyl")} />
          <Input type="number" {...register("left_eye_dist_axis")} />
          {/* Left Eye */}

          <Typography textAlign="center">Near</Typography>
          {/* Right Eye */}

          <Input type="number" {...register("right_eye_near_sph")} />
          <Input type="number" {...register("right_eye_near_cyl")} />
          <Input type="number" {...register("right_eye_near_axis")} />
          {/* Right Eye */}
          {/* Left Eye */}

          <Input type="number" {...register("left_eye_near_sph")} />
          <Input type="number" {...register("left_eye_near_cyl")} />
          <Input type="number" {...register("left_eye_near_axis")} />
          {/* Left Eye */}
        </Grid>
      </Paper>
    </div>
  );
}
