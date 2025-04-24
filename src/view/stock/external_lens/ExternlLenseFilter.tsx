import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
export interface ExternlLenseFilterProps {
  availableFilters: {
    lens_types: number[];
    coatings: number[];
    brands: number[];
  } | null;
  setExternalLenseParams: (params: {
    lens_type?: number | null;
    coating?: number | null;
    brand?: number | null;
  }) => void;
}

export default function ExternlLenseFilter({
  availableFilters,
  setExternalLenseParams,
}: ExternlLenseFilterProps) {
  const [filterTypes, setFilterTypes] = useState<{
    lens_type: number | null;
    coating: number | null;
    brand: number | null;
  }>({
    lens_type: null,
    coating: null,
    brand: null,
  });
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const { brands, brandsLoading } = useGetBrands({ brand_type: "lens" });
  const { coatings, coatingsLoading } = useGetCoatings();

  const filteredLenseTypes = useMemo(() => {
    if (!availableFilters) return lenseTypes;
    return lenseTypes.filter((type) =>
      availableFilters.lens_types.includes(type.id)
    );
  }, [lenseTypes, availableFilters]);

  //   const filteredBrands = useMemo(() => {
  //     if (!availableFilters) return brands;
  //     return brands.filter((brand) => availableFilters.brands.includes(brand.id));
  //   }, [brands, availableFilters]);

  const filteredCoatings = useMemo(() => {
    if (!availableFilters) return coatings;
    return coatings.filter((coating) =>
      availableFilters.coatings.includes(coating.id)
    );
  }, [coatings, availableFilters]);

  return (
    <Box width={"800px"} display="flex" alignItems={"center"} gap={2}>
      <AutocompleteInputField
        options={brands}
        onChange={(id) => {
          setExternalLenseParams({ brand: id });
          setFilterTypes({
            lens_type: null,
            coating: null,
            brand: id,
          });
        }}
        labelName="Lens Factory"
        loading={brandsLoading}
        defaultId={filterTypes.brand}
      />
      <AutocompleteInputField
        options={filteredLenseTypes}
        onChange={(id) => {
          setExternalLenseParams({ lens_type: id });
          setFilterTypes((prev) => ({ ...prev, lens_type: id }));
        }}
        labelName="Lens Type"
        loading={lenseTypesLoading || !availableFilters}
        defaultId={filterTypes.lens_type}
      />
      <AutocompleteInputField
        options={filteredCoatings}
        onChange={(id) => {
          setExternalLenseParams({ coating: id });
          setFilterTypes((prev) => ({ ...prev, coating: id }));
        }}
        labelName="Coating"
        loading={coatingsLoading || !availableFilters}
        defaultId={filterTypes.coating}
      />
      <Button
        onClick={() => {
          setExternalLenseParams({
            lens_type: null,
            coating: null,
            brand: null,
          });
          setFilterTypes({
            lens_type: null,
            coating: null,
            brand: null,
          });
        }}
        sx={{ width: 100 }}
        variant="contained"
      >
        Reset
      </Button>
    </Box>
  );
}
