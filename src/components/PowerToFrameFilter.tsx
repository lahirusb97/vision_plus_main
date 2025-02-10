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
import { addFrame, removeFrame } from "../features/invoice/frameFilterSlice";
import { FrameModel } from "../model/FrameModel";
import toast from "react-hot-toast";
import { Delete, Remove, RemoveCircle } from "@mui/icons-material";

export default function PowerToFrameFilter() {
  const dispatch = useDispatch();
  const selectedFrameList = useSelector(
    (state) => state.invoice_frame_filer.selectedFrameList
  );
  const { frames, framesLoading, framesError } = useGetFrames();
  const { brands, brandsLoading, brandsError } = useGetBrands();
  const { codes, codesLoading, codesError } = useGetCodes();
  const { colors, colorsLoading, colorsError } = useGetColors();
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
    if (
      selectFrame.code &&
      selectFrame.brand &&
      selectFrame.color &&
      selectFrame.size &&
      selectFrame.species
    ) {
      const matchingItems: FrameModel[] = frames.filter(
        (item) =>
          item.code === selectFrame.code &&
          item.brand === selectFrame.brand &&
          item.color === selectFrame.color &&
          item.size === selectFrame.size &&
          item.species === selectFrame.species
      );

      if (matchingItems.length === 1) {
        setSelectedFrame({ ...matchingItems[0] });
        setPrice(parseInt(matchingItems[0].price));
      } else {
        setPrice(0);
      }
    } else {
      setPrice(0);
    }
  }, [selectFrame]);
  const addFrameByList = () => {
    if (selectedFrame) {
      if (price > 0) {
        dispatch(addFrame({ ...selectedFrame, price: String(price) }));
        toast.success("Frame Added ");
      } else {
        toast.error("Price must be greater than 0");
      }
    } else {
      toast.error("No Frame Selected");
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
            setSelectFrame((preState) => ({ ...preState, brand: id }))
          }
          loading={brandsLoading}
          labelName="Select Brand"
          defaultId={null}
        />

        <DropdownInput
          options={avilableCodes}
          onChange={(selectedId) =>
            setSelectFrame((preState) => ({ ...preState, code: selectedId }))
          }
          loading={codesLoading}
          labelName="Select Code"
          defaultId={null}
        />

        {/* Color Dropdown */}
        <DropdownInput
          options={colors}
          onChange={(selectedId) =>
            setSelectFrame((preState) => ({ ...preState, color: selectedId }))
          }
          loading={colorsLoading}
          labelName="Select Color"
          defaultId={null}
        />

        <FormControl fullWidth>
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
        </FormControl>

        {/* Species Dropdown */}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Species</InputLabel>
          <Select
            onChange={(e) =>
              setSelectFrame((preState) => ({
                ...preState,
                species: e.target.value,
              }))
            }
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="species"
            value={selectFrame.species}
          >
            <MenuItem value={"Metal"}>Metal</MenuItem>
            <MenuItem value={"Plastic"}>Plastic</MenuItem>
            <MenuItem value={"Metal/Plastic"}>Metal/Plastic</MenuItem>
          </Select>
        </FormControl>

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
        {selectedFrameList.map((frame, index) => (
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
            <Typography variant="body2">Code: {frame.code}</Typography>
            <Typography variant="body2">Brand: {frame.brand}</Typography>
            <Typography variant="body2">Color: {frame.color}</Typography>
            <Typography variant="body2">Size: {frame.size}</Typography>
            <Typography variant="body2">Price: {frame.price}</Typography>
            <IconButton
              onClick={() => dispatch(removeFrame(frame.id))}
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
interface dataList {
  id: number;
  name: string;
  brand: number;
}
