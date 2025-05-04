import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import DropdownInput from "./inputui/DropdownInput";
import useGetFrames from "../hooks/lense/useGetFrames";
import useGetBrands from "../hooks/lense/useGetBrand";
import useGetCodes from "../hooks/lense/useGetCode";
import { useDispatch, useSelector } from "react-redux";
import { setFrame } from "../features/invoice/frameFilterSlice";
import { FrameModel } from "../model/FrameModel";
import toast from "react-hot-toast";
import { RootState } from "../store/store";
import InvoiceFrameItem from "./InvoiceFrameItem";
import axiosClient from "../axiosClient";
import { Colors } from "../model/ColorsModel";
import { closeStockDrawer } from "../features/invoice/stockDrawerSlice";
import { extractErrorMessage } from "../utils/extractErrorMessage";

export default function PowerToFrameFilter() {
  const dispatch = useDispatch();
  //GET FRAME LIST
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const { frames, framesLoading } = useGetFrames();
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "frame",
  });

  const { codes, codesLoading } = useGetCodes();

  const [colors, setColors] = useState<Colors[]>([]);
  const [colorLoading, setColorLoading] = useState<boolean>(false);
  const [avilableCodes, setAvilableCodes] = React.useState<dataList[]>([]);
  const [price, setPrice] = React.useState<string>("");
  const [frameByQty, setFrameByQty] = React.useState<number>(1);
  const [selectedFrame, setSelectedFrame] = React.useState<FrameModel | null>(
    null
  );
  const [searchFrame, setSearchFrame] = React.useState<{
    brand: number | null;
    code: number | null;
    color: number | null;
    size: string | null;
    species: string | null;
  }>({
    brand: null,
    code: null,
    color: null,
    size: null,
    species: null,
  });
  //Filter Codes usign Brand
  useEffect(() => {
    if (searchFrame.brand) {
      setAvilableCodes(
        codes.filter((item) => item.brand === searchFrame.brand)
      );
    } else {
      setAvilableCodes([]);
    }
  }, [searchFrame.brand]);
  //Filter Codes usign Brand

  //Filter Colors usign Brand ID and frame ID **
  useEffect(() => {
    if (searchFrame.brand && searchFrame.code) {
      filterColorsByBrandAndCode();
    } else {
      setColors([]);
    }
  }, [searchFrame.brand, searchFrame.code]);
  //Filter Colors usign Brand ID and frame ID
  //* GET FROM DB FIILTERD COLORS
  const filterColorsByBrandAndCode = async () => {
    try {
      setColorLoading(true);
      const response = await axiosClient.get<Colors[]>("/frames/colors/", {
        params: {
          brand_id: searchFrame.brand,
          code_id: searchFrame.code,
        },
      });
      setColors(response.data);
    } catch (error) {
      setColors([]);
      extractErrorMessage(error);
    } finally {
      setColorLoading(false);
    }
  };
  //TODO GET DATA FROM DB FIILTERD COLORS END**

  //TODO find a maching frame by brand code and color

  useEffect(() => {
    if (
      !framesLoading &&
      searchFrame.brand &&
      searchFrame.code &&
      searchFrame.color
    ) {
      setSelectedFrame(null);
      setPrice("");
      const matchingItems: FrameModel[] = frames.filter(
        (item) =>
          item.code === searchFrame.code &&
          item.brand === searchFrame.brand &&
          item.color === searchFrame.color
      );
      if (matchingItems.length === 1) {
        setPrice(parseInt(matchingItems[0].price).toString());
        setSelectedFrame({ ...matchingItems[0] });
      } else if (matchingItems.length > 1) {
        toast.error("Multiple frames found check the stock ");
      }
    } else {
      //! If Any of valuse null set selected frame to null & Price 0
      setSelectedFrame(null);
      setPrice("");
    }
  }, [searchFrame.brand, searchFrame.code, searchFrame.color, framesLoading]);

  //TODO find a maching frame by brand code and color END***

  const addFrameByList = () => {
    if (selectedFrame) {
      if (
        parseInt(price) > 0 &&
        selectedFrame.id &&
        selectedFrame?.stock[0]?.qty > 0 &&
        selectedFrame?.stock[0]?.qty >= frameByQty
      ) {
        dispatch(
          setFrame({
            frame_id: selectedFrame.id,
            avilable_qty: selectedFrame.stock[0].qty,
            price_per_unit: parseInt(price),
            buyQty: frameByQty,
            subtotal: parseInt(price) * frameByQty,
            frame_detail: {
              brand_name: selectedFrame.brand_name,
              code_name: selectedFrame.code_name,
              color_name: selectedFrame.color_name,
              size: selectedFrame.size,
              species: selectedFrame.species,
            },
          })
        );

        setSelectedFrame(null);
        setSearchFrame({
          brand: null,
          code: null,
          color: null,
          size: null,
          species: null,
        });
        dispatch(closeStockDrawer());
      } else {
        if (parseInt(price) < 0) {
          toast.error("Price must be greater than 0");
        } else if (!selectedFrame) {
          toast.error("No Frame Selected");
        } else if (!selectedFrame?.stock[0]?.qty) {
          toast.error("Selected Frame is out of stock");
        } else if (selectedFrame?.stock[0]?.qty < frameByQty) {
          toast.error(
            "Selected Frame only has " +
              selectedFrame?.stock[0]?.qty +
              " in stock"
          );
        } else {
          toast.error("Something went wrong");
        }
      }
    } else {
      toast.error("No Frame Selected");
    }
  };

  return (
    <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
      <Typography variant="h6">Select Frames </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",

          gap: 1,
        }}
      >
        <Box width={{ minWidth: 180 }}>
          <DropdownInput
            options={brands}
            onChange={(id) =>
              setSearchFrame((preState) => ({ ...preState, brand: id }))
            }
            loading={brandsLoading}
            labelName="Select Brand"
            defaultId={searchFrame.brand}
          />
        </Box>
        <Box width={{ minWidth: 180 }}>
          <DropdownInput
            options={avilableCodes}
            onChange={(selectedId) =>
              setSearchFrame((preState) => ({ ...preState, code: selectedId }))
            }
            loading={codesLoading}
            labelName="Select Code"
            defaultId={searchFrame.code}
          />
        </Box>
        {/* Color Dropdown */}
        <Box width={{ minWidth: 180 }}>
          <DropdownInput
            options={colors}
            onChange={(selectedId) =>
              setSearchFrame((preState) => ({ ...preState, color: selectedId }))
            }
            loading={colorLoading}
            labelName="Select Color"
            defaultId={searchFrame.color}
          />
        </Box>
        {/* Species Dropdown */}
        <Box width={{ minWidth: 130 }}>
          <Typography>
            Size- {selectedFrame ? selectedFrame.size : "N/A"}
          </Typography>
        </Box>
        <Box width={{ minWidth: 150 }}>
          <Typography>
            Species- {selectedFrame ? selectedFrame.species : "N/A"}
          </Typography>
        </Box>
        <TextField
          size="small"
          label="Price"
          type="number"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          inputProps={{ min: 0 }}
        />
        <TextField
          sx={{ width: 80 }}
          size="small"
          label="Qty"
          type="number"
          variant="outlined"
          value={frameByQty}
          onChange={(e) => setFrameByQty(parseInt(e.target.value))}
          inputProps={{ min: 0 }}
        />
        <Paper sx={{ p: 1 }}>{selectedFrame?.stock[0]?.qty || 0}</Paper>

        {/* <Button color="info" onClick={findFrame} variant="contained">
          <Search />
        </Button> */}
        <Button
          disabled={!selectedFrame}
          onClick={addFrameByList}
          variant="contained"
        >
          Add
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {Object.values(selectedFrameList).length !== 0 &&
          Object.values(selectedFrameList).map((frame) => (
            <div key={frame.frame_id}>
              <InvoiceFrameItem frame={frame} />
            </div>
          ))}
      </Box>
    </Paper>
  );
}
interface dataList {
  id: number;
  name: string;
  brand: number;
}
