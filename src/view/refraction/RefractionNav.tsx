import { Paper } from "@mui/material";

import NavButton from "../../components/NavButton";

export default function RefractionNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Refraction Number" path={"/"} />
      <NavButton name="Refraction Details" path={"/refraction/details"} />
    </>
  );
}
