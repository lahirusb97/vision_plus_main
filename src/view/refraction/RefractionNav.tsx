import { Paper } from "@mui/material";
import React from "react";
import NavButton from "../../components/NavButton";

export default function RefractionNav() {
  return (
    <div>
      <Paper>
        {/* Pass unique onClick handlers */}
        <NavButton name="Refraction Number" path={"/"} />
        <NavButton name="Refraction Details" path={"/refraction/details"} />
      </Paper>
    </div>
  );
}
