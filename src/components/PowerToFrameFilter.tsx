import React, { useEffect } from "react";
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
interface FrameWithQty extends FrameModel {
  buyQty: number;
}
export default function PowerToFrameFilter() {
  const dispatch = useDispatch();
  const selectedFrameList = useSelector(
    (state: RootState) => state.invoice_frame_filer.selectedFrameList
  );
  const { frames, framesLoading } = useGetFrames();
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "frame",
  });
  const { codes, codesLoading } = useGetCodes();
  const { colors, colorsLoading } = useGetColors();
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
  useEffect(() => {
    if (selectFrame.brand) {
      setAvilableCodes(
        codes.filter((item) => item.brand === selectFrame.brand)
      );
    } else {
      setAvilableCodes([]);
    }
  }, [selectFrame.brand]);
  useEffect(() => {
    findFrame();
    // if (selectFrame.brand || selectFrame.code || selectFrame.color) {
    //   setSelectedFrame(null);
    //   setPrice(0);
    // }
  }, [selectFrame.brand, selectFrame.code, selectFrame.color]);

  const findFrame = () => {
    if (
      framesLoading === false &&
      selectFrame.code &&
      selectFrame.brand &&
      selectFrame.color
    ) {
      setSelectedFrame(null);
      const matchingItems: FrameModel[] = frames.filter(
        (item) =>
          item.code === selectFrame.code &&
          item.brand === selectFrame.brand &&
          item.color === selectFrame.color
      );
      console.log(matchingItems);

      if (matchingItems.length === 1) {
        setPrice(parseInt(matchingItems[0].price));
        setSelectedFrame({ ...matchingItems[0] });
      } else {
        setPrice(0);
        // setSelectFrame({
        //   brand: null,
        //   code: null,
        //   color: null,
        //   size: null,
        //   species: null,
        // });
      }
    }
  };
  console.log("selectedFrame", selectFrame);

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
  console.log("selectedFrameList", selectFrame);

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
          loading={colorsLoading}
          labelName="Select Color"
          defaultId={selectFrame.color}
        />

        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Shape</InputLabel>
          <Select
            onChange={(e) =>
              setSelectFrame((preState) => ({
                ...preState,
                size: e.target.value,
              }))
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Shape"
            value={selectFrame.size}
          >
            <MenuItem value={"Half"}>Half</MenuItem>
            <MenuItem value={"Full"}>Full</MenuItem>
            <MenuItem value={"Rimless"}>Rimless</MenuItem>
          </Select>
        </FormControl> */}

        {/* Species Dropdown */}
        <Box width={{ minWidth: 130 }}>
          <Typography>
            Size- {selectedFrame ? selectedFrame.size : "__"}
          </Typography>
        </Box>
        <Box width={{ minWidth: 150 }}>
          <Typography>
            Species- {selectedFrame ? selectedFrame.species : "__"}
          </Typography>
        </Box>

        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Species</InputLabel>
          <Select
            disabled
            onChange={(e) =>
              setSelectFrame((preState) => ({
                ...preState,
                species: e.target.value,
              }))
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="species"
            value={selectedFrame.species}
          >
            <MenuItem value={"Metal"}>Metal</MenuItem>
            <MenuItem value={"Plastic"}>Plastic</MenuItem>
            <MenuItem value={"Metal/Plastic"}>Metal/Plastic</MenuItem>
          </Select>
        </FormControl> */}

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
