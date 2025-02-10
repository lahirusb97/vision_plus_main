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
import { addLense, removeLense } from "../features/invoice/lenseFilterSlice";
import { useFormContext } from "react-hook-form";

export default function PowerToLenseFilter() {
  const dispatch = useDispatch();
  const { watch } = useFormContext();
  const selectedLenseList = useSelector(
    (state) => state.invoice_frame_filer.selectedFrameList
  );
  const { lenses, lensesLoading } = useGetLenses();
  const { brands, brandsLoading, brandsError } = useGetBrands();
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
    if (selectLense.lenseType && selectLense.coating && selectLense.brand) {
      const rightEyeDistSph = watch("right_eye_dist_sph");
      const rightEyeDistCyl = watch("right_eye_dist_cyl");
      const rightEyeNearSph = watch("right_eye_near_sph");

      const matchingItems: LenseModel[] = lenses.filter((item) => {
        if (
          item.brand === selectedLense?.brand &&
          item.type === selectLense.lenseType &&
          item.coating === selectLense.lenseType
        ) {
          const hasSph = item.powers.some(
            (p) => p.power === 1 && p.value === rightEyeDistSph
          );
          const hasCyl = item.powers.some(
            (p) => p.power === 2 && p.value === rightEyeDistCyl
          );
          const hasNearSph = item.powers.some(
            (p) => p.power === 3 && p.value === rightEyeNearSph
          );

          return hasSph && hasCyl && hasNearSph; // Only return if all match
        } else {
          return false;
        }
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
  }, [selectLense]);

  const addFrameByList = () => {
    if (selectLense) {
      if (price > 0) {
        dispatch(addLense({ ...selectLense, price: String(price) }));
        toast.success("Lense Added ");
      } else {
        toast.error("Price must be greater than 0");
      }
    } else {
      toast.error("No Lense Selected");
    }
  };

  return (
    <div>
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
          onChange={(e) => setPrice(Number(e.target.value))}
          inputProps={{ min: 0 }}
        />

        <Button onClick={addFrameByList} variant="contained">
          Add
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="flex-start">
        {selectedLenseList.map((lense, index) => (
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
            <Typography variant="body2">
              Lense Type: {lense.stock.lens_type}
            </Typography>
            <Typography variant="body2">
              Coating : {lense.stock.coating}
            </Typography>
            <Typography variant="body2">Brand: {lense.brand}</Typography>
            <IconButton
              onClick={() => dispatch(removeLense(lense.id))}
              color="error"
            >
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Grid>
    </div>
  );
}
