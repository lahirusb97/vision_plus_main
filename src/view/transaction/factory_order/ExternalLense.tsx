import React, { useEffect } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useGetBrands from "../../../hooks/lense/useGetBrand";
import useGetCoatings from "../../../hooks/lense/useGetCoatings";
import useGetLenseTypes from "../../../hooks/lense/useGetLenseType";
import { useFormContext } from "react-hook-form";
import { setexternalLense } from "../../../features/invoice/externalLenseSlice";
import DropdownInputReturnWIthName from "../../../components/inputui/DropdownInputReturnWIthName";
import { closeStockDrawer } from "../../../features/invoice/stockDrawerSlice";
import toast from "react-hot-toast";

export default function ExternalLense() {
  const dispatch = useDispatch();
  const { watch } = useFormContext();
  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLense
  );

  //CAll Hoos to recive Type Brand and Coating
  const { brands: LensFactory, brandsLoading: LensFactoryLoading } =
    useGetBrands({ brand_type: "lens" });

  const { coatings, coatingsLoading } = useGetCoatings();
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const [lenseTypeSelection, setLenseTypeSelection] = React.useState<null | {
    id: number;
    typeName: string;
  }>(null);
  const [lenseCoatingSelection, setLenseCoatingSelection] =
    React.useState<null | {
      id: number;
      coatingName: string;
    }>(null);
  const [lenseFactorySelection, setLenseFactorySelection] =
    React.useState<null | {
      id: number;
      factoryName: string;
    }>(null);

  const [price, setPrice] = React.useState<string>("");

  const addNoneStockLense = () => {
    if (
      lenseTypeSelection &&
      lenseCoatingSelection &&
      lenseFactorySelection &&
      parseInt(price) >= 0
    ) {
      // console.log({ ...selectedItem, price: price });
      // console.log(watch("left_eye_dist_sph"));
      // console.log(watch("left_eye_dist_cyl"));
      // console.log(watch("left_eye_dist_axis"));
      // console.log(watch("left_eye_near_sph"));

      // console.log(watch("right_eye_dist_sph"));
      // console.log(watch("right_eye_dist_cyl"));
      // console.log(watch("right_eye_dist_axis"));
      // console.log(watch("right_eye_near_sph"));
      const externalLense = {
        external_lens_data: {
          lens: {
            type: lenseTypeSelection.id,
            coating: lenseCoatingSelection.id,
            brand: lenseFactorySelection.id,
            price: parseInt(price),
          },
        },
        quantity: 1,
        price_per_unit: parseInt(price),
        subtotal: parseInt(price),
        is_non_stock: true,
        lensNames: {
          typeName: lenseTypeSelection.typeName,
          coatingName: lenseCoatingSelection.coatingName,
          brandName: lenseFactorySelection.factoryName,
        },
      };
      const entries = Object.values(externalLenseInvoiceList);

      //Adding Manual Id to Track changes and Removes
      dispatch(
        setexternalLense({
          ...externalLense,
          id: entries.length == 0 ? 1 : entries[entries.length - 1].id + 1,
        })
      );
      setPrice("0");
      dispatch(closeStockDrawer());
    } else {
      toast.error("Please fill all the External Lense selection fields");
    }
  };

  return (
    <div>
      <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
        <Typography variant="h6">Select External Lense </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <DropdownInputReturnWIthName
            options={LensFactory}
            onChange={(factory) =>
              factory &&
              setLenseFactorySelection({
                id: factory.id,
                factoryName: factory.name,
              })
            }
            loading={LensFactoryLoading}
            labelName="Lens Factory"
            defaultId={null}
          />
          <DropdownInputReturnWIthName
            options={coatings}
            onChange={(factory) =>
              factory &&
              setLenseCoatingSelection({
                id: factory.id,
                coatingName: factory.name,
              })
            }
            loading={coatingsLoading}
            labelName="Lens Coating"
            defaultId={null}
          />
          <DropdownInputReturnWIthName
            options={lenseTypes}
            onChange={(factory) =>
              factory &&
              setLenseTypeSelection({
                id: factory.id,
                typeName: factory.name,
              })
            }
            loading={lenseTypesLoading}
            labelName="Lens Types"
            defaultId={null}
          />

          <TextField
            fullWidth
            type="number"
            size="medium"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "0") {
                setPrice("");
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setPrice("0");
              }
            }}
          />
          <Button onClick={addNoneStockLense} variant="contained">
            Add
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
