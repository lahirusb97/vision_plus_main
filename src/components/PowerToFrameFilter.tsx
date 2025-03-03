import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import DropdownInput from "./inputui/DropdownInput";
import useGetFrames from "../hooks/lense/useGetFrames";
import useGetBrands from "../hooks/lense/useGetBrand";
import useGetColors from "../hooks/lense/useGetColors";
import useGetCodes from "../hooks/lense/useGetCode";
import { useDispatch, useSelector } from "react-redux";
import { removeFrame, setFrame } from "../features/invoice/frameFilterSlice";
import { FrameModel } from "../model/FrameModel";
import toast from "react-hot-toast";
import { Delete, FindInPage, Search } from "@mui/icons-material";
import { RootState } from "../store/store";
import InvoiceFrameItem from "./InvoiceFrameItem";
import { set } from "react-hook-form";
import axiosClient from "../axiosClient";
import { Colors } from "../model/ColorsModel";
import axios from "axios";
interface FrameWithQty extends FrameModel {
  buyQty: number;
}
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
  const [price, setPrice] = React.useState<number>(0);
  const [selectedFrame, setSelectedFrame] = React.useState<FrameModel | null>(
    null
  );
  const [selectFrame, setSelectFrame] = React.useState<{
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
    if (selectFrame.brand) {
      setAvilableCodes(
        codes.filter((item) => item.brand === selectFrame.brand)
      );
    } else {
      setAvilableCodes([]);
    }
  }, [selectFrame.brand]);
  //Filter Codes usign Brand

  //Filter Colors usign Brand ID and frame ID **
  useEffect(() => {
    if (selectFrame.brand && selectFrame.code) {
      filterColorsByBrandAndCode();
    } else {
      setColors([]);
    }
  }, [selectFrame.brand, selectFrame.code]);
  //Filter Colors usign Brand ID and frame ID
  //* GET FROM DB FIILTERD COLORS
  const filterColorsByBrandAndCode = async () => {
    try {
      setColorLoading(true);
      const response = await axiosClient.get<Colors[]>("/frames/colors/", {
        params: {
          brand_id: selectFrame.brand,
          code_id: selectFrame.code,
        },
      });
      setColors(response.data);
    } catch (error) {
      setColors([]);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Brand And Code need to be selected");
        }
      } else {
        toast.error("try again netowek error");
      }
    } finally {
      setColorLoading(false);
    }
  };
  //TODO GET DATA FROM DB FIILTERD COLORS END**

  //TODO find a maching frame by brand code and color

  useEffect(() => {
    if (
      !framesLoading &&
      selectFrame.brand &&
      selectFrame.code &&
      selectFrame.color
    ) {
      setSelectedFrame(null);
      setPrice(0);
      const matchingItems: FrameModel[] = frames.filter(
        (item) =>
          item.code === selectFrame.code &&
          item.brand === selectFrame.brand &&
          item.color === selectFrame.color
      );
      if (matchingItems.length === 1) {
        setPrice(parseInt(matchingItems[0].price));
        setSelectedFrame({ ...matchingItems[0] });
      } else if (matchingItems.length > 1) {
        toast.error("Multiple frames found check the stock ");
      }
    } else {
      //! If Any of valuse null set selected frame to null & Price 0
      setSelectedFrame(null);
      setPrice(0);
    }
  }, [selectFrame.brand, selectFrame.code, selectFrame.color, framesLoading]);

  //TODO find a maching frame by brand code and color END***

  const addFrameByList = () => {
    if (selectedFrame) {
      if (price > 0 && selectedFrame.id) {
        dispatch(
          setFrame({ ...selectedFrame, price: String(price) } as FrameWithQty)
        );
        toast.success("Frame Added ");
        setSelectedFrame(null);
        setSelectFrame({
          brand: null,
          code: null,
          color: null,
          size: null,
          species: null,
        });
      } else {
        toast.error("Price must be greater than 0");
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
          marginY: 3,
          gap: 2,
        }}
      >
        <DropdownInput
          options={brands}
          onChange={(id) =>
            setSelectFrame((preState) => ({ ...preState, brand: id }))
          }
          loading={brandsLoading}
          labelName="Select Brand"
          defaultId={selectFrame.brand}
        />

        <DropdownInput
          options={avilableCodes}
          onChange={(selectedId) =>
            setSelectFrame((preState) => ({ ...preState, code: selectedId }))
          }
          loading={codesLoading}
          labelName="Select Code"
          defaultId={selectFrame.code}
        />

        {/* Color Dropdown */}
        <DropdownInput
          options={colors}
          onChange={(selectedId) =>
            setSelectFrame((preState) => ({ ...preState, color: selectedId }))
          }
          loading={false}
          labelName="Select Color"
          defaultId={selectFrame.color}
        />
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
          label="Price"
          type="number"
          fullWidth
          margin="normal"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          inputProps={{ min: 0 }}
        />
        <Paper sx={{ p: 1 }}>
          {selectedFrame ? selectedFrame?.stock.qty : ""}
        </Paper>

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {Object.values(selectedFrameList).length !== 0 &&
          Object.values(selectedFrameList).map((frame) => (
            <div>
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
