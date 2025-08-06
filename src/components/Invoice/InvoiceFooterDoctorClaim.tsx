import { Box, Typography } from "@mui/material";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";

export default function InvoiceFooterDoctorClaim() {
  return (
    <>
      <Typography
        variant="body2"
        align="center"
        sx={{ marginTop: "2mm", fontWeight: "bolder" }}
      >
        <span style={{ color: "red", fontSize: "4mm" }}>* </span>We will not be
        responsible for any uncollected orders after 3 months. Non-refundable.
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ fontWeight: "bold", fontFamily: "fm-emanee" }}
      >
        {`udi  03la blaujQ weKjqï  ms<sn|j j.lshkq fkd,efí' ì,am;a i|yd f.jQ uqo,a kej; f.jkq fkd,efí' `}
      </Typography>
      <Box sx={{ mt: "2mm", display: "flex", justifyContent: "center" }}>
        <Typography variant="body1">
          Branches
          <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
        </Typography>
        <Typography variant="body1">
          Mathugama - 034 2247466
          <span style={{ margin: "0 2mm", fontWeight: "bold" }}>|</span>
        </Typography>
        <Typography variant="body1">Aluthgama - 034 2275268</Typography>
      </Box>

      {/* Footer Note */}

      {/* <Typography variant="body2" align="center" sx={{ fontSize: "12px" }}>
        Bill Printed On{" "}
        <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>{" "}
        {dateAndTimeFormat(new Date().toISOString())}
      </Typography> */}
    </>
  );
}
