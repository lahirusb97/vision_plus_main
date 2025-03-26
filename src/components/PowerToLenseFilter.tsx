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
import {
  bifocalID,
  progresiveID,
  singleVisionID,
} from "../data/staticVariables";
import { AxiosError } from "axios";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
interface LenseWithQty extends LenseModel {
  buyQty: number;
  lenseSide: string;
}
interface RefractionDetailProps {
  refractionDetail: Pick<
    RefractionDetailModel,
    | "right_eye_dist_sph"
    | "right_eye_dist_cyl"
    | "right_eye_dist_axis"
    | "right_eye_near_sph"
    | "left_eye_dist_sph"
    | "left_eye_dist_cyl"
    | "left_eye_dist_axis"
    | "left_eye_near_sph"
  > | null;
}
export default function PowerToLenseFilter({
  refractionDetail,
}: RefractionDetailProps) {
  const dispatch = useDispatch();
  const [leftPowers, setLeftPowers] = useState<
    Pick<
      RefractionDetailModel,
      "left_eye_dist_sph" | "left_eye_dist_cyl" | "left_eye_near_sph"
    >
  >({
    left_eye_dist_sph: null,
    left_eye_dist_cyl: null,
    left_eye_near_sph: null,
  });

  const [rightPowers, setRightPowers] = useState<
    Pick<
      RefractionDetailModel,
      "right_eye_dist_sph" | "right_eye_dist_cyl" | "right_eye_near_sph"
    >
  >({
    right_eye_dist_sph: null,
    right_eye_dist_cyl: null,
    right_eye_near_sph: null,
  });

  const { brands, brandsLoading } = useGetBrands({
    brand_type: "lens",
  });
  const [leftPrice, setLeftPrice] = React.useState<string>("");
  const [rightPrice, setRightPrice] = React.useState<string>("");

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
  console.log("selectedLenseList", refractionDetail);

  useEffect(() => {
    setLeftPowers({
      left_eye_dist_sph: refractionDetail?.left_eye_dist_sph ?? null,
      left_eye_dist_cyl: refractionDetail?.left_eye_dist_cyl ?? null,
      left_eye_near_sph: refractionDetail?.left_eye_near_sph ?? null,
    });
    setRightPowers({
      right_eye_dist_sph: refractionDetail?.right_eye_dist_sph ?? null,
      right_eye_dist_cyl: refractionDetail?.right_eye_dist_cyl ?? null,
      right_eye_near_sph: refractionDetail?.right_eye_near_sph ?? null,
    });
  }, [refractionDetail]);

  const addRightLense = () => {
    if (selectedLenseRight) {
      if (parseInt(rightPrice)) {
        dispatch(
          setLense({
            ...selectedLenseRight,
            price: rightPrice,
            buyQty: 1,
            lenseSide: "right",
          } as LenseWithQty)
        );
        toast.success("Lense Added to Right Side");
        setSelectedLenseRight(null);
        setRightPrice("");
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
        const progresive = {
          sph_right: rightPowers.right_eye_dist_sph,
          add_right: rightPowers.right_eye_near_sph,
        };
        const normal = {
          sph_right: rightPowers.right_eye_dist_sph,
          cyl_right: rightPowers.right_eye_dist_cyl,
        };
        const bifocal = {
          sph_right: rightPowers.right_eye_dist_sph,
          add_right: rightPowers.right_eye_near_sph,
        };

        try {
          const responce = await axiosClient.get("/lenses/search/", {
            params: {
              brand_id: selectLense.brand,
              type_id: selectLense.lenseType,
              coating_id: selectLense.coating,
              ...(selectLense.lenseType === progresiveID
                ? progresive
                : selectLense.lenseType === singleVisionID
                ? normal
                : selectLense.lenseType === bifocalID
                ? bifocal
                : null),
            },
          });

          const lenseObj = responce.data.lens;
          const stockObj = responce.data.stock;
          console.log(lenseObj);

          setSelectedLenseRight({ ...lenseObj, ...stockObj });
          setRightPrice(lenseObj?.price || 0);
          toast.success("Sujested Lens Match Found Plese Check Lense Powers");
        } catch (error) {
          if (error instanceof AxiosError) {
            // Safely access error.response.data.message
            toast.error(
              error.response?.data?.message || "Something went wrong"
            );
          }
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
        const progresive = {
          sph_left: leftPowers.left_eye_dist_sph,
          add_left: leftPowers.left_eye_near_sph,
        };
        const normal = {
          sph_left: leftPowers.left_eye_dist_sph,
          cyl_left: leftPowers.left_eye_dist_cyl,
        };
        const bifocal = {
          sph_left: leftPowers.left_eye_dist_sph,
          add_left: leftPowers.left_eye_near_sph,
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
          setSelectedLenseLeft({ ...lenseObj, ...stockObj });
          setLeftPrice(lenseObj?.price || 0);
          toast.success("Sujested Lens Match Found Plese Check Lense Powers");
        } catch (error) {
          if (error instanceof AxiosError) {
            // Safely access error.response.data.message
            toast.error(
              error.response?.data?.message ||
                "Faile to Search Something went wrong"
            );
          }
        }
      }
    }
  };
  const addLeftLense = () => {
    if (selectedLenseLeft) {
      if (parseInt(leftPrice)) {
        dispatch(
          setLense({
            ...selectedLenseLeft,
            price: leftPrice,
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
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            marginY: 3,
            width: "100%",
            gap: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
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
            <DropdownInput
              options={brands}
              onChange={(id) =>
                setSelectLense((preState) => ({ ...preState, brand: id }))
              }
              loading={brandsLoading}
              labelName="Lens Factory"
              defaultId={null}
            />
          </Box>

          {/* Color Dropdown */}
          <Box sx={{ flexGrow: 1 }}>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
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
              onChange={(e) => setRightPrice(e.target.value)}
              inputProps={{ min: 0 }}
            />
            <Paper
              sx={{
                p: 1,
                minWidth: 40,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                {selectedLenseRight ? selectedLenseRight?.qty : "N/A"}
              </Typography>
            </Paper>
            <Button
              onClick={handleSearchRight}
              color="inherit"
              variant="contained"
            >
              <Search />
            </Button>
            <Button size="small" onClick={addRightLense} variant="contained">
              Right Add
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
              onChange={(e) => setLeftPrice(e.target.value)}
              inputProps={{ min: 0 }}
            />
            <Paper
              sx={{
                p: 1,
                minWidth: 40,
                minHeight: 30,

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                {selectedLenseLeft ? selectedLenseLeft?.qty : "N/A"}
              </Typography>
            </Paper>
            <Button
              onClick={handleSearchLeft}
              color="inherit"
              variant="contained"
            >
              <Search />
            </Button>
            <Button size="small" onClick={addLeftLense} variant="contained">
              Left Add
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
