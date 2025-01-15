import AddVariationComp from "./AddVariationComp";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetColors from "../../hooks/lense/useGetColors";
import useGetCodes from "../../hooks/lense/useGetCode";
import CodeCRUD from "./CodeCRUD";
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
export default function AddVariation() {
  const { coatings, refresh: refreshCoatings } = useGetCoatings();
  const { brands, refresh: refreshBrands } = useGetBrands();
  const { colors, refresh: refreshColors } = useGetColors();
  const { codes, refresh: refreshCodes } = useGetCodes();
  const { lenseTypes, refresh: refreshLenseTypes } = useGetLenseTypes();

  return (
    <div>
      <AddVariationComp
        textName="Lense Types"
        Urlpath="/lens-types/"
        dataList={lenseTypes}
        refresh={refreshLenseTypes}
      />
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
      <CodeCRUD
        textName="Codes"
        Urlpath="/codes/"
        dataList={codes}
        brandList={brands}
        refresh={refreshCodes}
      />
    </div>
  );
}
