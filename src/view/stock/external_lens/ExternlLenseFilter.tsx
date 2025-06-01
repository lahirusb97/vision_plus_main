import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import useGetExternalFactorys from "../../../hooks/lense/useGetExternalFactorys";
import useGetExternalCoating from "../../../hooks/lense/useGetExternalCoating";
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
  const { externalFactorys, externalFactorysLoading } =
    useGetExternalFactorys();
  const { externalCoatings, externalCoatingsLoading } = useGetExternalCoating();
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
    if (!availableFilters) return externalCoatings;
    return externalCoatings.filter((coating) =>
      availableFilters.coatings.includes(coating.id)
    );
  }, [externalCoatings, availableFilters]);

  return (
    <Box width={"1200px"} display="flex" alignItems={"center"} gap={2}>
      <Box sx={{ display: "flex", gap: 2 }} width={"800px"}>
        <AutocompleteInputField
          options={externalFactorys}
          onChange={(id) => {
            setExternalLenseParams({ brand: id });
            setFilterTypes({
              lens_type: null,
              coating: null,
              brand: id,
            });
          }}
          labelName="Lens Factory"
          loading={externalFactorysLoading}
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
      </Box>
      <AutocompleteInputField
        options={filteredCoatings}
        onChange={(id) => {
          setExternalLenseParams({ coating: id });
          setFilterTypes((prev) => ({ ...prev, coating: id }));
        }}
        labelName="Coating"
        loading={externalCoatingsLoading || !availableFilters}
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
