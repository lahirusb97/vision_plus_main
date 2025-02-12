import AddVariationComp from "./AddVariationComp";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetColors from "../../hooks/lense/useGetColors";
import useGetCodes from "../../hooks/lense/useGetCode";
import CodeCRUD from "./CodeCRUD";
import { Box, Grid2 } from "@mui/material";
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
export default function AddVariation() {
  const { coatings } = useGetCoatings();
  const { brands: lenseBrand } = useGetBrands({ brand_type: "lens" });
  const { brands: frameBrand } = useGetBrands({ brand_type: "frame" });
  const { colors } = useGetColors();
  const { codes, refresh: refreshCodes } = useGetCodes();
  const { lenseTypes, refresh: refreshLenseTypes } = useGetLenseTypes();

  return (
    <Grid2
      sx={{
        width: "1200px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        columnGap: 10,
        rowGap: 2,
        "& > :last-child:nth-child(odd)": {
          // Full-width for odd last item
          gridColumn: "1 / -1",
        },
      }}
    >
      <AddVariationComp
        textName="Lense Types"
        Urlpath="lense_type"
        dataList={lenseTypes}
      />
      <AddVariationComp
        textName="Frames Brand"
        Urlpath="frame_brand"
        dataList={frameBrand}
      />
      <AddVariationComp
        textName="Lense Brand"
        Urlpath="lense_brand"
        dataList={lenseBrand}
      />
      <AddVariationComp
        textName="Lense Coating"
        Urlpath="lens_coatings"
        dataList={coatings}
      />

      <AddVariationComp textName="Colors" Urlpath="color" dataList={colors} />
      <CodeCRUD
        textName="Codes"
        Urlpath="/codes/"
        dataList={codes}
        brandList={frameBrand}
        refresh={refreshCodes}
      />
    </Grid2>
  );
}
