import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, TextField, Grid } from "@mui/material";
import DropdownInput from "./inputui/DropdownInput";
import useGetLenses from "../hooks/lense/useGetLense";

import useGetBrands from "../hooks/lense/useGetBrand";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import useGetCoatings from "../hooks/lense/useGetCoatings";
import useGetLenseTypes from "../hooks/lense/useGetLenseType";
import { LenseModel } from "../model/LenseModel";
import { setLense } from "../features/invoice/lenseFilterSlice";
import { useFormContext } from "react-hook-form";
import { RootState } from "../store/store";
import InvoiceLenseItem from "./InvoiceLenseItem";
interface LenseWithQty extends LenseModel {
  buyQty: number;
}
export default function PowerToLenseFilter() {
  const dispatch = useDispatch();
  const [leftPowers, setLeftPowers] = useState({
    left_eye_dist_sph: "",
    left_eye_dist_cyl: "",
    left_eye_near_sph: "",
  });
  const [rightPowers, setRightPowers] = useState({
    right_eye_dist_sph: "",
    right_eye_dist_cyl: "",
    right_eye_near_sph: "",
  });
  const { watch } = useFormContext();
  const { lenses, lensesLoading } = useGetLenses();
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "lens",
  });
  const [leftPrice, setLeftPrice] = React.useState<number>(0);
  const [rightPrice, setRightPrice] = React.useState<number>(0);

  const { coatings, coatingsLoading } = useGetCoatings();
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const [selectedLense, setSelectedLense] = React.useState<LenseModel | null>(
    null
  );
  const selectedLenseList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
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
    setLeftPowers({
      left_eye_dist_sph: watch("left_eye_dist_sph"),
      left_eye_dist_cyl: watch("left_eye_dist_cyl"),
      left_eye_near_sph: watch("left_eye_near_sph"),
    });
    setRightPowers({
      right_eye_dist_sph: watch("right_eye_dist_sph"),
      right_eye_dist_cyl: watch("right_eye_dist_cyl"),
      right_eye_near_sph: watch("right_eye_near_sph"),
    });
    console.log("render");
  }, []);

  useEffect(() => {
    // if (
    //   selectLense.lenseType &&
    //   selectLense.coating &&
    //   selectLense.brand &&
    //   !lensesLoading
    // ) {
    //   const normalizeValue = (val: any) => parseFloat(val || "0").toFixed(2); // Convert to float, then string with 2 decimals
    //   const rightEyeDistSph = normalizeValue(watch("right_eye_dist_sph"));
    //   const rightEyeDistCyl = normalizeValue(watch("right_eye_dist_cyl"));
    //   const rightEyeNearSph = normalizeValue(watch("right_eye_near_sph"));
    //   const leftEyeDistSph = normalizeValue(watch("left_eye_dist_sph"));
    //   const leftEyeDistCyl = normalizeValue(watch("left_eye_dist_cyl"));
    //   const leftEyeNearSph = normalizeValue(watch("left_eye_near_sph"));
    //   const matchingItems: LenseModel[] = lenses.filter((item) => {
    //     if (
    //       item.brand === selectLense.brand &&
    //       item.type === selectLense.lenseType &&
    //       item.coating === selectLense.coating
    //     ) {
    //       const powers = item.stock?.powers || [];
    //       const matchesPower = (powerType: number, value: string) =>
    //         powers.some(
    //           (p) => p.power === powerType && normalizeValue(p.value) === value
    //         );
    //       if (item.type === 1) {
    //         return (
    //           matchesPower(1, rightEyeDistSph) &&
    //           matchesPower(2, rightEyeDistCyl)
    //         );
    //       } else if (item.type === 2 || item.type === 3) {
    //         return (
    //           matchesPower(1, rightEyeDistSph) &&
    //           matchesPower(3, rightEyeNearSph)
    //         );
    //       }
    //     }
    //     return false;
    //   });
    //   if (matchingItems.length === 1) {
    //     setSelectedLense({ ...matchingItems[0] });
    //     setPrice(parseInt(matchingItems[0].price));
    //   } else {
    //     setPrice(0);
    //   }
    // } else {
    //   setPrice(0);
    // }
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
    // if (selectLense) {
    //   if (price > 0) {
    //     dispatch(
    //       setLense({
    //         ...selectedLense,
    //         price: String(price),
    //         buyQty: 1,
    //       } as LenseWithQty)
    //     );
    //     toast.success("Lense Added ");
    //   } else {
    //     toast.error("Price must be greater than 0");
    //   }
    // } else {
    //   toast.error("No Lense Selected");
    // }
  };

  return (
    <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
      <Typography variant="h6">Select Lense </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginY: 3,
            width: "100%",

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
              setSelectLense((preState) => ({
                ...preState,
                coating: selectedId,
              }))
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
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Paper sx={{ p: 1, m: 1 }}>
              <Typography textAlign={"center"}>L</Typography>
            </Paper>

            <TextField
              size="small"
              label="sph"
              type="number"
              variant="outlined"
              value={leftPowers.left_eye_dist_sph}
              onChange={(e) =>
                setLeftPowers({
                  ...leftPowers,
                  left_eye_dist_sph: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              size="small"
              label="cyl"
              type="number"
              variant="outlined"
              value={leftPowers.left_eye_dist_cyl}
              onChange={(e) =>
                setLeftPowers({
                  ...leftPowers,
                  left_eye_dist_cyl: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              size="small"
              label="add"
              type="number"
              variant="outlined"
              value={leftPowers.left_eye_near_sph}
              onChange={(e) =>
                setLeftPowers({
                  ...leftPowers,
                  left_eye_near_sph: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              label="Price"
              type="number"
              margin="normal"
              variant="outlined"
              value={leftPrice}
              onChange={(e) => setLeftPrice(parseInt(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* left side  */}
            <Paper sx={{ p: 1, m: 1 }}>
              <Typography textAlign={"center"}>R</Typography>
            </Paper>

            <TextField
              size="small"
              label="sph"
              type="number"
              variant="outlined"
              value={rightPowers.right_eye_dist_sph}
              onChange={(e) =>
                setRightPowers({
                  ...rightPowers,
                  right_eye_dist_sph: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              size="small"
              label="cyl"
              type="number"
              variant="outlined"
              value={rightPowers.right_eye_dist_cyl}
              onChange={(e) =>
                setRightPowers({
                  ...rightPowers,
                  right_eye_dist_cyl: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              size="small"
              label="add"
              type="number"
              variant="outlined"
              value={rightPowers.right_eye_near_sph}
              onChange={(e) =>
                setRightPowers({
                  ...rightPowers,
                  right_eye_near_sph: e.target.value,
                })
              }
              inputProps={{ step: 0.25 }}
            />
            <TextField
              label="Price"
              type="number"
              margin="normal"
              variant="outlined"
              value={rightPrice}
              onChange={(e) => setRightPrice(parseInt(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Box>
        </Box>

        <Button onClick={addFrameByList} variant="contained">
          Add
        </Button>
      </Box>
      <Grid container spacing={2} justifyContent="flex-start">
        {Object.values(selectedLenseList).length !== 0 &&
          Object.values(selectedLenseList).map((lense) => (
            <div>
              <InvoiceLenseItem lense={lense} />
            </div>
          ))}
      </Grid>
    </Paper>
  );
}
