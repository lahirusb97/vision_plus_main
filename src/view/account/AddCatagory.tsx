import React from "react";
import { Box } from "@mui/material";
import AddVariationComp from "../stock/AddVariationComp";
import CodeCRUD from "../stock/CodeCRUD";
import useGetExCategory from "../../hooks/useGetExCategory";
import ExSubCategoryComp from "./expencess_category/ExSubCategoryComp";
import useGetSubExCategory from "../../hooks/useGetSubExCategory";

const AddCatagory = () => {
  const { exCategory, exCategoryLoading, exCategoryRefresh } =
    useGetExCategory();
  const { subExCategory, subExCategoryLoading, subExCategoryRefresh } =
    useGetSubExCategory();
  return (
    <Box width={"600px"} p={2}>
      <AddVariationComp
        textName="Main Category "
        Urlpath="main"
        dataList={exCategory}
        pathroute={"expense-categories/"}
        refresh={exCategoryRefresh}
      />

      <ExSubCategoryComp
        textName="Expense"
        categoryList={exCategory}
        subcategoryList={subExCategory}
        refresh={exCategoryRefresh}
        basePath="settings/categories"
      />
    </Box>
  );
};

export default AddCatagory;
