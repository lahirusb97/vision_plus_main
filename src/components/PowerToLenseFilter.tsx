import React, { useEffect } from "react";
import {
  Input,
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
import DropdownInput from "./inputui/DropdownInput";
import useGetLenses from "../hooks/lense/useGetLense";
import useGetFrames from "../hooks/lense/useGetFrames";
import useGetBrands from "../hooks/lense/useGetBrand";
import useGetColors from "../hooks/lense/useGetColors";
import useGetCodes from "../hooks/lense/useGetCode";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { Delete, Remove, RemoveCircle } from "@mui/icons-material";
import useGetCoatings from "../hooks/lense/useGetCoatings";
import useGetLenseTypes from "../hooks/lense/useGetLenseType";
import { LenseModel } from "../model/LenseModel";
import { removeLense, setLense } from "../features/invoice/lenseFilterSlice";
import { useFormContext } from "react-hook-form";
import { RootState } from "../store/store";
interface LenseWithQty extends LenseModel {
  buyQty: number;
}
export default function PowerToLenseFilter() {
  const dispatch = useDispatch();
  const { watch } = useFormContext();
  const selectedLenseList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  console.log(selectedLenseList);

  const { lenses, lensesLoading } = useGetLenses();
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "lens",
  });
  const { coatings, coatingsLoading } = useGetCoatings();
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const [price, setPrice] = React.useState<number>(0);
  const [selectedLense, setSelectedLense] = React.useState<LenseModel | null>(
    null
  );
  const [selectLense, setSelectLense] = React.useState<{
    lenseType: number | null;
    coating: number | null;
    brand: number | null;
  }>({
    lenseType: null,
    coating: null,
    brand: null,
  });

  useEffect(() => {
    if (
      selectLense.lenseType &&
      selectLense.coating &&
      selectLense.brand &&
      !lensesLoading
    ) {
      const normalizeValue = (val: any) => parseFloat(val || "0").toFixed(2); // Convert to float, then string with 2 decimals

      const rightEyeDistSph = normalizeValue(watch("right_eye_dist_sph"));
      const rightEyeDistCyl = normalizeValue(watch("right_eye_dist_cyl"));
      const rightEyeNearSph = normalizeValue(watch("right_eye_near_sph"));

      const matchingItems: LenseModel[] = lenses.filter((item) => {
        if (
          item.brand === selectLense.brand &&
          item.type === selectLense.lenseType &&
          item.coating === selectLense.coating
        ) {
          const powers = item.stock?.powers || [];

          const matchesPower = (powerType: number, value: string) =>
            powers.some(
              (p) => p.power === powerType && normalizeValue(p.value) === value
            );

          if (item.type === 1) {
            return (
              matchesPower(1, rightEyeDistSph) &&
              matchesPower(2, rightEyeDistCyl)
            );
          } else if (item.type === 2 || item.type === 3) {
            return (
              matchesPower(1, rightEyeDistSph) &&
              matchesPower(3, rightEyeNearSph)
            );
          }
        }
        return false;
      });
      if (matchingItems.length === 1) {
        setSelectedLense({ ...matchingItems[0] });
        setPrice(parseInt(matchingItems[0].price));
      } else {
        setPrice(0);
      }
    } else {
      setPrice(0);
    }
  }, [
    selectLense.brand,
    selectLense.coating,
    selectLense.lenseType,
    lensesLoading,
    watch("right_eye_dist_sph"),
    watch("right_eye_dist_cyl"),
    watch("right_eye_near_sph"),
  ]);

  const addFrameByList = () => {
    if (selectLense) {
      if (price > 0) {
        dispatch(
          setLense({
            ...selectedLense,
            price: String(price),
            buyQty: 1,
          } as LenseWithQty)
        );
        toast.success("Lense Added ");
      } else {
        toast.error("Price must be greater than 0");
      }
    } else {
      toast.error("No Lense Selected");
    }
  };

  return (
    <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
      <Typography variant="h6">Select Lense </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginY: 3,
          gap: 2,
        }}
      >
        <DropdownInput
          options={brands}
          onChange={(id) =>
            setSelectLense((preState) => ({ ...preState, brand: id }))
          }
          loading={brandsLoading}
          labelName="Select Brand"
          defaultId={null}
        />

        <DropdownInput
          options={coatings}
          onChange={(selectedId) =>
            setSelectLense((preState) => ({ ...preState, coating: selectedId }))
          }
          loading={coatingsLoading}
          labelName="Select Coating"
          defaultId={null}
        />

        {/* Color Dropdown */}
        <DropdownInput
          options={lenseTypes}
          onChange={(selectedId) =>
            setSelectLense((preState) => ({
              ...preState,
              lenseType: selectedId,
            }))
          }
          loading={lenseTypesLoading}
          labelName="Select Type"
          defaultId={null}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          inputProps={{ min: 0 }}
        />

        <Button onClick={addFrameByList} variant="contained">
          Add
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="flex-start">
        {Object.values(selectedLenseList).length === 0 ? (
          <></>
        ) : (
          Object.values(selectedLenseList).map((lense) => (
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                padding: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 1,
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Type: {lense.type}</Typography>
              <Typography variant="body2">Brand: {lense.brand}</Typography>
              <Typography variant="body2">Size: {lense.coating}</Typography>
              <Typography variant="body2">Quantity: {lense.buyQty}</Typography>
              <Typography variant="body2">
                Unite Price: {lense.price}
              </Typography>
              <Typography variant="body2">
                Total Price: {parseInt(lense.price) * lense.buyQty}
              </Typography>
              <IconButton
                onClick={() => dispatch(removeLense(lense.id))}
                color="error"
              >
                <Delete />
              </IconButton>
            </Paper>
          ))
        )}
      </Grid>
    </Paper>
  );
}
