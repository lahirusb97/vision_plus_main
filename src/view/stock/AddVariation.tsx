import AddVariationComp from "./AddVariationComp";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetColors from "../../hooks/lense/useGetColors";
import useGetCodes from "../../hooks/lense/useGetCode";
import CodeCRUD from "./CodeCRUD";
import { Box, Grid2, Paper } from "@mui/material";
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
export default function AddVariation() {
  const { coatings, refresh: refreshCoatings } = useGetCoatings();
  const { brands: lenseBrand, refresh: refreshLenseBrand } = useGetBrands({
    brand_type: "lens",
  });
  const { brands: frameBrand, refresh: refreshFrameBrand } = useGetBrands({
    brand_type: "frame",
  });
  const { colors, refresh: refreshColors } = useGetColors();
  const { codes, refresh: refreshCodes } = useGetCodes();
  const { lenseTypes, refresh: refreshLenseTypes } = useGetLenseTypes();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper variant="outlined" sx={{ width: "600px" }}>
        {/* <AddVariationComp
          textName="Lense Types"
          Urlpath="lense_type"
          dataList={lenseTypes}
          pathroute="lens-types"
          refresh={refreshLenseTypes}
        /> */}

        <AddVariationComp
          textName="Lens Factory"
          Urlpath="lense_brand"
          dataList={lenseBrand}
          pathroute={"brands"}
          refresh={refreshLenseBrand}
        />
        <AddVariationComp
          textName="Lense Coating"
          Urlpath="lens_coatings"
          dataList={coatings}
          pathroute={"lens-coatings"}
          refresh={refreshCoatings}
        />
      </Paper>
      <Paper variant="outlined" sx={{ width: "600px" }}>
        <AddVariationComp
          textName="Frames Brand"
          Urlpath="frame_brand"
          dataList={frameBrand}
          pathroute={"brands"}
          refresh={refreshFrameBrand}
        />
        <AddVariationComp
          textName="Frame Colors"
          Urlpath="color"
          dataList={colors}
          pathroute={"colors"}
          refresh={refreshColors}
        />
        <CodeCRUD
          textName="Frame Codes"
          Urlpath="/codes/"
          dataList={codes}
          brandList={frameBrand}
          refresh={refreshCodes}
          pathroute="codes"
        />
      </Paper>
    </Box>
  );
}
