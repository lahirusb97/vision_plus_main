import { Box } from "@mui/material";
import AddVariationComp from "../stock/AddVariationComp";

import ExSubCategoryComp from "./expencess_category/ExSubCategoryComp";
import { useGetSubExCategory } from "../../hooks/useGetSubExCategory";
import { useGetExCategory } from "../../hooks/useGetExCategory";
import TitleText from "../../components/TitleText";

const AddCatagory = () => {
  const { exCategory, exCategoryLoading, exCategoryRefresh } =
    useGetExCategory();
  const { subExCategory, subExCategoryRefresh } = useGetSubExCategory();

  return (
    <Box width={"600px"}>
      <TitleText title="Manage Expence Category" />
      <AddVariationComp
        textName="Expence Category "
        Urlpath="main_category"
        loading={exCategoryLoading}
        dataList={exCategory}
        pathroute={"expense-categories"}
        refresh={() => {
          exCategoryRefresh();
          subExCategoryRefresh(new AbortController().signal);
        }}
      />

      <ExSubCategoryComp
        textName="Expense"
        categoryList={exCategory}
        subcategoryList={subExCategory}
        refresh={exCategoryRefresh}
      />
    </Box>
  );
};

export default AddCatagory;
