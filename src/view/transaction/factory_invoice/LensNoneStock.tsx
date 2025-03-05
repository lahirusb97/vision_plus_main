import React from "react";
import useGetOtherItems from "../../../hooks/useGetOtherItems";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import DropdownInput from "../../../components/inputui/DropdownInput";
import { setotherItem } from "../../../features/invoice/otherItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
export default function LensNoneStock() {
  //CAll Hoos to recive Type Brand and Coating
  const { brands: LensFactory, brandsLoading: LensFactoryLoading } =
    useGetBrands({ brand_type: "lens" });

  const { coatings, coatingsLoading } = useGetCoatings();
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const [selectedItem, setSelecedIteme] = React.useState<{
    id: number | null;
    name: string | null;
    price: number;
  }>({
    id: null,
    name: null,
    price: 0,
  });
  const [price, setPrice] = React.useState<number>(0);
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_other_Item.selectedOtherItems
  );
  const dispatch = useDispatch();
  // const addItems = () => {
  //   if (selectedItem.id) {
  //     dispatch(
  //       setotherItem({
  //         id: selectedItem.id,
  //         name: selectedItem.name,
  //         price: price,
  //       })
  //     );
  //   }
  // };
  return (
    <div>
      <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
        <Typography variant="h6">Select Other Items </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DropdownInput
            options={LensFactory}
            onChange={
              (id) => console.log(id)

              // setSelectLense((preState) => ({ ...preState, brand: id }))
            }
            loading={LensFactoryLoading}
            labelName="Lens Factory"
            defaultId={null}
          />
          <DropdownInput
            options={coatings}
            onChange={
              (id) => console.log(id)

              // setSelectLense((preState) => ({ ...preState, brand: id }))
            }
            loading={LensFactoryLoading}
            labelName="Lens Coating"
            defaultId={null}
          />
          <DropdownInput
            options={lenseTypes}
            onChange={
              (id) => console.log(id)

              // setSelectLense((preState) => ({ ...preState, brand: id }))
            }
            loading={lenseTypesLoading}
            labelName="Lens Types"
            defaultId={null}
          />
          <TextField
            fullWidth
            type="number"
            size="medium"
            value={price}
            onFocus={(e) => {
              if (e.target.value === "0") {
                setPrice(0);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setPrice(0);
              }
            }}
          />
          <Button onClick={addItems} variant="contained">
            Add
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
