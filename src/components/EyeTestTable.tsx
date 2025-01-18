import { Grid, Paper, Typography, Input } from "@mui/material";

export default function EyeTestTable({ register, errors }: any) {
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
          <Input
            error={errors?.right_eye_dist_sph}
            type="number"
            {...register("right_eye_dist_sph")}
          />
          <Input
            error={errors?.right_eye_dist_cyl}
            type="number"
            {...register("right_eye_dist_cyl")}
          />
          <Input type="number" {...register("right_eye_dist_axis")} />
          {/* Right Eye */}

          {/* Left Eye */}
          <Input
            error={errors?.left_eye_dist_sph}
            type="number"
            {...register("left_eye_dist_sph")}
          />
          <Input
            error={errors?.left_eye_dist_cyl}
            type="number"
            {...register("left_eye_dist_cyl")}
          />
          <Input type="number" {...register("left_eye_dist_axis")} />
          {/* Left Eye */}

          <Typography textAlign="center">Near</Typography>
          {/* Right Eye */}

          <Input
            error={errors?.right_eye_near_sph}
            type="number"
            placeholder="s"
            {...register("right_eye_near_sph")}
          />
          <Input
            error={errors?.right_eye_near_cyl}
            type="number"
            placeholder="s"
            {...register("right_eye_near_cyl")}
          />
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
