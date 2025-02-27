import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
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
import { Search } from "@mui/icons-material";
import axiosClient from "../axiosClient";
import { findMatchingLense } from "../utils/findMatchingLense";
interface LenseWithQty extends LenseModel {
  buyQty: number;
  lenseSide: string;
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
  const [selectedLenseLeft, setSelectedLenseLeft] =
    React.useState<LenseModel | null>(null);
  const [selectedLenseRight, setSelectedLenseRight] =
    React.useState<LenseModel | null>(null);
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
  }, [watch]);

  const addRightLense = () => {
    if (selectedLenseRight) {
      if (rightPrice > 0) {
        dispatch(
          setLense({
            ...selectedLenseRight,
            price: String(rightPrice),
            buyQty: 1,
            lenseSide: "right",
          } as LenseWithQty)
        );
        toast.success("Lense Added to Right Side");
        setSelectedLenseRight(null);
        setRightPrice(0);
      } else {
        toast.error("Price  Right  Side lense must be greater than 0");
      }
    } else {
      toast.error("No Lense Selected");
    }
  };
  const handleSearchRight = async () => {
    if (selectLense.brand && selectLense.coating && selectLense.lenseType) {
      if (
        (rightPowers.right_eye_near_sph && rightPowers.right_eye_dist_cyl) ||
        rightPowers.right_eye_dist_sph
      ) {
        console.log(rightPowers);

        // const params: { [key: string]: any } = {
        //   brand_id: selectLense.brand,
        //   type_id: selectLense.lenseType,
        //   coating_id: selectLense.coating,
        //   sph: parseFloat(rightPowers.right_eye_dist_sph).toFixed(2),
        //   side: selectLense.lenseType !== 1 ? "right" : null,
        // };

        // if (rightPowers.right_eye_dist_cyl) {
        //   params.cyl = parseFloat(rightPowers.right_eye_dist_cyl).toFixed(2);
        // }

        // if (rightPowers.right_eye_near_sph) {
        //   params.add = rightPowers.right_eye_near_sph;
        // }
        // const matchingLenses = findMatchingLense(params, lenses);
        // console.log("matchingLenses Right", matchingLenses);

        // if (matchingLenses.length > 0) {
        //   setSelectedLenseRight(matchingLenses[0]);
        //   setRightPrice(matchingLenses[0]?.price || 0);
        // } else {
        //   setSelectedLenseRight(null);
        //   setRightPrice(0);
        // }
        const progresive = {
          sph_right: rightPowers.right_eye_dist_sph,
          add_right: rightPowers.right_eye_near_sph,
        };
        const normal = {
          sph: rightPowers.right_eye_dist_sph,
          cyl: rightPowers.right_eye_dist_cyl,
        };
        const bifocal = {
          sph: rightPowers.right_eye_dist_sph,
          add: rightPowers.right_eye_near_sph,
        };
        try {
          const responce = await axiosClient.get("/lenses/search/", {
            params: {
              brand_id: selectLense.brand,
              type_id: selectLense.lenseType,
              coating_id: selectLense.coating,
              ...(selectLense.lenseType.toString() === "3"
                ? progresive
                : selectLense.lenseType.toString() === "1"
                ? normal
                : selectLense.lenseType.toString() === "2"
                ? bifocal
                : null),
            },
          });

          const lenseObj = responce.data.lens;
          const stockObj = responce.data.stock;

          setSelectedLenseRight({ ...lenseObj, ...stockObj });
          setRightPrice(lenseObj?.price || 0);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  //!Left Side
  const handleSearchLeft = async () => {
    if (selectLense.brand && selectLense.coating && selectLense.lenseType) {
      if (
        (leftPowers.left_eye_near_sph && leftPowers.left_eye_dist_cyl) ||
        leftPowers.left_eye_dist_sph
      ) {
        // const params: { [key: string]: any } = {
        //   brand_id: selectLense.brand,
        //   type_id: selectLense.lenseType,
        //   coating_id: selectLense.coating,
        //   sph: parseFloat(leftPowers.left_eye_dist_sph).toFixed(2),
        //   side: selectLense.lenseType !== 1 ? "left" : null,
        // };

        // if (leftPowers.left_eye_dist_cyl) {
        //   params.cyl = parseFloat(leftPowers.left_eye_dist_cyl).toFixed(2);
        // }

        // if (leftPowers.left_eye_near_sph) {
        //   params.add = leftPowers.left_eye_near_sph;
        // }
        // const matchingLenses = findMatchingLense(params, lenses);
        // console.log(matchingLenses);

        // if (matchingLenses.length > 0) {
        //   setSelectedLenseLeft(matchingLenses[0]);
        //   setLeftPrice(matchingLenses[0]?.price || 0);
        // } else {
        //   setSelectedLenseLeft(null);
        //   setLeftPrice(0);
        // }
        const progresive = {
          sph_left: leftPowers.left_eye_dist_sph,
          add_left: leftPowers.left_eye_near_sph,
        };
        const normal = {
          sph: leftPowers.left_eye_dist_sph,
          cyl: leftPowers.left_eye_dist_cyl,
        };
        const bifocal = {
          sph: leftPowers.left_eye_dist_sph,
          add: leftPowers.left_eye_near_sph,
        };
        console.log(leftPowers);

        try {
          const responce = await axiosClient.get("/lenses/search/", {
            params: {
              brand_id: selectLense.brand,
              type_id: selectLense.lenseType,
              coating_id: selectLense.coating,
              ...(selectLense.lenseType.toString() === "3"
                ? progresive
                : selectLense.lenseType.toString() === "1"
                ? normal
                : selectLense.lenseType.toString() === "2"
                ? bifocal
                : null),
            },
          });
          const lenseObj = responce.data.lens;
          const stockObj = responce.data.stock;
          setSelectedLenseLeft({ ...lenseObj, ...stockObj });
          setLeftPrice(lenseObj?.price || 0);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const addLeftLense = () => {
    if (selectedLenseLeft) {
      if (leftPrice > 0) {
        dispatch(
          setLense({
            ...selectedLenseLeft,
            price: String(leftPrice),
            buyQty: 1,
            lenseSide: "left",
          } as LenseWithQty)
        );
        toast.success("Lense Added to Left Side");
        setSelectedLenseLeft(null);
        setLeftPrice(0);
      } else {
        toast.error("Price  Left  Side lense must be greater than 0");
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
            <Paper sx={{ p: 1 }}>
              {selectedLenseLeft ? selectedLenseLeft?.qty : ""}
            </Paper>
            <Button
              onClick={handleSearchLeft}
              color="inherit"
              variant="contained"
            >
              <Search />
            </Button>
            <Button onClick={addLeftLense} variant="contained">
              Left Add
            </Button>
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
            <Paper sx={{ p: 1 }}>
              {selectedLenseRight ? selectedLenseRight?.qty : ""}
            </Paper>
            <Button
              onClick={handleSearchRight}
              color="inherit"
              variant="contained"
            >
              <Search />
            </Button>
            <Button onClick={addRightLense} variant="contained">
              Right Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
        {Object.values(selectedLenseList).length !== 0 &&
          Object.values(selectedLenseList).map((lenseitem) => (
            <div>
              <InvoiceLenseItem lense={lenseitem} />
            </div>
          ))}
      </Box>
    </Paper>
  );
}
