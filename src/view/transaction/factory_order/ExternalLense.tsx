import React, { useEffect } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import { setexternalLense } from "../../../features/invoice/externalLenseSlice";

import { closeStockDrawer } from "../../../features/invoice/stockDrawerSlice";
import toast from "react-hot-toast";

import ExternlLenseFilter from "../../stock/external_lens/ExternlLenseFilter";
import { useGetExternalLenses } from "../../../hooks/useGetExternalLenses";
import InvoiceExternalLenseItem from "../../../components/InvoiceExternalLenseItem";

export default function ExternalLense() {
  const dispatch = useDispatch();
  const { externaLenseList, externaLenseListLoading, setExternalLenseParams } =
    useGetExternalLenses();
  console.log("externalLenseList", externaLenseList);

  const externalLenseInvoiceList = useSelector(
    (state: RootState) => state.invoice_external_lense.externalLenseList
  );
  const selectedprice = externaLenseList?.results[0]?.price ?? "0";

  const [price, setPrice] = React.useState<string>(selectedprice);
  const [externalLensQty, setExternalLensQty] = React.useState<string>("0");
  const [externalLensNote, setExternalLensNote] = React.useState<string>("");
  console.log("price", selectedprice);
  useEffect(() => {
    if (externaLenseList?.results.length === 1) {
      setPrice(selectedprice);
    } else {
      setPrice("0");
    }
  }, [externaLenseList?.results]);

  const addNoneStockLense = () => {
    if (parseInt(price) >= 0 && parseInt(externalLensQty) > 0) {
      if (externaLenseList?.results.length === 1) {
        const selectedExternalLense = externaLenseList?.results[0];
        dispatch(
          setexternalLense({
            buyQty: parseInt(externalLensQty),
            external_lens_id: selectedExternalLense.id,
            subtotal: parseInt(externalLensQty) * parseInt(price),
            price_per_unit: parseInt(price),
            note: externalLensNote,
            external_lens_details: {
              brand_name: selectedExternalLense.brand_name,
              coating_name: selectedExternalLense.coating_name,
              type_name: selectedExternalLense.lens_type_name,
            },
          })
        );
        setPrice("0");
        dispatch(closeStockDrawer());
      } else {
        toast.error(
          "Dublicated External Lense Found Please Remove Duplicated External Lense from the store"
        );
      }
    } else {
      toast.error("Quantity and Price should be greater than 0");
    }
  };

  return (
    <div>
      <Paper variant="elevation" sx={{ padding: 2, m: 2 }}>
        <Typography mb={1} variant="h6">
          Select External Lense{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ExternlLenseFilter
              availableFilters={externaLenseList?.available_filters ?? null}
              setExternalLenseParams={setExternalLenseParams}
            />
            <TextField
              fullWidth
              label="Lens note"
              type="text"
              size="small"
              value={externalLensNote}
              onChange={(e) => setExternalLensNote(e.target.value)}
            />
          </Box>
          <TextField
            sx={{ width: 100 }}
            type="number"
            size="small"
            label="Price"
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
          <TextField
            sx={{ width: 100 }}
            label="Quantity"
            type="number"
            size="small"
            value={externalLensQty}
            onChange={(e) => setExternalLensQty(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "0") {
                setExternalLensQty("");
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                setExternalLensQty("0");
              }
            }}
          />
          <Button onClick={addNoneStockLense} variant="contained">
            Add
          </Button>
        </Box>
      </Paper>
      <Box sx={{ padding: 2 }}>
        {Object.values(externalLenseInvoiceList).length !== 0 &&
          Object.values(externalLenseInvoiceList).map((externalLensItem) => (
            <div key={externalLensItem.external_lens_id}>
              <InvoiceExternalLenseItem lense={externalLensItem} />
            </div>
          ))}
        {/* {externalLenseInvoiceList.} */}
      </Box>
    </div>
  );
}
