import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useDeleteDialog } from "../../../context/DeleteDialogContext";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";

interface Category {
  id: number;
  name: string;
}

interface Subcategory {
  id: number;
  main_category: number;
  main_category_name: string;
  name: string;
}

interface ExSubCategoryCompProps {
  textName: string;
  categoryList: Category[];
  subcategoryList: Subcategory[];
  refresh: () => void;
  basePath?: string; // Add basePath prop for flexible routing
}

export default function ExSubCategoryComp({
  textName,
  categoryList,
  subcategoryList,
  refresh,
  basePath = "add_catagory", // Default to your existing path
}: ExSubCategoryCompProps) {
  const navigate = useNavigate();
  const { id: categoryIdFromRoute } = useParams();
  const { openDialog } = useDeleteDialog();
  console.log(subcategoryList);

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    categoryIdFromRoute ? parseInt(categoryIdFromRoute) : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<
    number | null
  >(null);
  const [availableSubcategories, setAvailableSubcategories] = React.useState<
    Subcategory[]
  >([]);

  useEffect(() => {
    if (selectedCategory) {
      setAvailableSubcategories(
        subcategoryList.filter(
          (item) => item.main_category === selectedCategory
        )
      );
    } else {
      setAvailableSubcategories([]);
    }
  }, [selectedCategory, subcategoryList]);

  return (
    <div>
      <Paper sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{textName} Subcategory Management</Typography>

        {/* Category Selection */}
        <AutocompleteInputField
          options={categoryList}
          loading={false}
          labelName="Select Category"
          defaultId={selectedCategory}
          onChange={(id) => {
            setSelectedCategory(id);
            setSelectedSubcategory(null);
          }}
        />

        {/* Subcategory Selection */}
        <Box sx={{ marginY: 1 }}>
          <AutocompleteInputField
            options={availableSubcategories}
            loading={false}
            labelName="Select Subcategory"
            defaultId={selectedSubcategory}
            onChange={(id) => setSelectedSubcategory(id)}
            disabled={!selectedCategory}
          />
        </Box>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={() => {
              if (selectedCategory) {
                navigate(
                  `sub/create/${selectedCategory}?category=${selectedCategory}`
                );
              }
            }}
            disabled={!selectedCategory}
          >
            Add New Subcategory
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              if (selectedSubcategory) {
                navigate(
                  `sub/update/${selectedSubcategory}?category=${selectedCategory}`
                );
              }
            }}
            disabled={!selectedSubcategory}
          >
            Edit Subcategory
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              if (selectedSubcategory) {
                openDialog(
                  `/expense-subcategories/${selectedSubcategory}/`,
                  `${textName} subcategory`,
                  refresh
                );
              }
            }}
            disabled={!selectedSubcategory}
          >
            Delete Subcategory
          </Button>
        </div>
      </Paper>
    </div>
  );
}
