import React from "react";
import { Paper } from "@mui/material";
import AddVariationComp from "./AddVariationComp";
import useGetCoatings from "../../hooks/useGetCoatings";
import useGetBrands from "../../hooks/useGetBrand";
import useGetColors from "../../hooks/useGetColors";
export default function AddVariation() {
  const { coatings, refresh: refreshCoatings } = useGetCoatings();
  const { brands, refresh: refreshBrands } = useGetBrands();
  const { colors, refresh: refreshColors } = useGetColors();
  return (
    <div>
      <Paper>
        <AddVariationComp
          textName="Lense Coating"
          Urlpath="/lens-coatings/"
          dataList={coatings}
          refresh={refreshCoatings}
        />
        <AddVariationComp
          textName="Frames Brand"
          Urlpath="/brands/"
          dataList={brands}
          refresh={refreshBrands}
        />
        <AddVariationComp
          textName="Colors"
          Urlpath="/colors/"
          dataList={colors}
          refresh={refreshColors}
        />
      </Paper>
    </div>
  );
}
