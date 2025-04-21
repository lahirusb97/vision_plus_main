import { Typography } from "@mui/material";

export default function TitleText({ title }: { title: string }) {
  return (
    <>
      <Typography sx={{ fontWeight: "bold", m: 0, p: 0 }} variant="subtitle1">
        {title}
      </Typography>
    </>
  );
}
