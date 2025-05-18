import AddVariationComp from "./AddVariationComp";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetColors from "../../hooks/lense/useGetColors";
import useGetCodes from "../../hooks/lense/useGetCode";
import CodeCRUD from "./CodeCRUD";
import { Box, Paper } from "@mui/material";
import TitleText from "../../components/TitleText";
// import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
export default function AddVariation() {
  const { coatings, coatingsLoading } = useGetCoatings();
  const { brands: lenseBrand, brandsLoading } = useGetBrands("lens");
  const { brands: frameBrand, brandsLoading: frameBrandLoading } =
    useGetBrands("frame");
  const { colors, colorsLoading } = useGetColors();
  const { codes } = useGetCodes();
  // const { lenseTypes, refresh: refreshLenseTypes } = useGetLenseTypes();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper variant="outlined" sx={{ width: "600px", p: 1 }}>
        <TitleText title="In Stock Lense Variations" />
        {/* <AddVariationComp
          textName="Lense Types"
          Urlpath="lense_type"
          dataList={lenseTypes}
          pathroute="lens-types"
          refresh={refreshLenseTypes}
        /> */}

        <AddVariationComp
          loading={brandsLoading}
          textName="Lens Factory"
          Urlpath="lense_brand"
          dataList={lenseBrand}
          // pathroute={"brands"}
          // refresh={refreshLenseBrand}
        />
        <AddVariationComp
          loading={coatingsLoading}
          textName="Lense Coating"
          Urlpath="lens_coatings"
          dataList={coatings}
          // pathroute={"lens-coatings"}
          // refresh={refreshCoatings}
        />
      </Paper>
      <Paper variant="outlined" sx={{ width: "600px", p: 1 }}>
        <TitleText title="In Stock Frame Variations" />
        <AddVariationComp
          textName="Frames Brand"
          Urlpath="frame_brand"
          loading={frameBrandLoading}
          dataList={frameBrand}
          // pathroute={"brands"}
          // refresh={refreshFrameBrand}
        />
        <AddVariationComp
          textName="Frame Colors"
          Urlpath="color"
          loading={colorsLoading}
          dataList={colors}
          // pathroute={"colors"}
          // refresh={refreshColors}
        />
        <CodeCRUD
          textName="Frame Codes"
          Urlpath="/codes/"
          dataList={codes}
          brandList={frameBrand}
          // refresh={refreshCodes}
          // pathroute="codes"
        />
      </Paper>
    </Box>
  );
}
