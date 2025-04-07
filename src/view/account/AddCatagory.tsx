import React from "react";
import { Box } from "@mui/material";
import AddVariationComp from "../stock/AddVariationComp";
import CodeCRUD from "../stock/CodeCRUD";

const AddCatagory = () => {
  return (
    <Box width={"600px"} p={2}>
      <AddVariationComp
        textName="Main Category "
        Urlpath="color"
        dataList={[]}
        pathroute={"colors"}
        refresh={() => {}}
      />
      <CodeCRUD
        textName="Sub Category"
        Urlpath="/codes/"
        dataList={[]}
        brandList={[]}
        refresh={() => {}}
        pathroute="codes"
      />
    </Box>
  );
};

export default AddCatagory;
