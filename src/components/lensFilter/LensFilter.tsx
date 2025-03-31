import React, { useEffect, useReducer } from "react";
import { RefractionDetailModel } from "../../model/RefractionDetailModel";
import { Box, Button, Typography, IconButton } from "@mui/material";
import useGetBrands from "../../hooks/lense/useGetBrand";
import useGetCoatings from "../../hooks/lense/useGetCoatings";
import useGetLenseTypes from "../../hooks/lense/useGetLenseType";
import LensFilterPowers from "./LensFilterPowers";
import DropdownInput from "../inputui/DropdownInput";
import { Search } from "@mui/icons-material";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getUserCurentBranch } from "../../utils/authDataConver";
import toast from "react-hot-toast";
import { lensefilterReducer, lensFilterinitialState } from "./LensFilterUtil";
import { useLensFilter } from "./useLensFilter";
import { useDispatch, useSelector } from "react-redux";
import { setLense } from "../../features/invoice/lenseFilterSlice";
import { LenseWithQty } from "../../model/LenseModel";
import { RootState } from "../../store/store";
import InvoiceLenseItem from "../InvoiceLenseItem";

export default function LensFilter({
  refractionDetail,
}: RefractionDetailsProps) {
  const dispatch = useDispatch();

  const selectedLenseList = useSelector(
    (state: RootState) => state.invoice_lense_filer.selectedLenses
  );
  const { brands, brandsLoading } = useGetBrands({
    brand_type: "lens",
  });
  const { coatings, coatingsLoading } = useGetCoatings();
  const { lenseTypes, lenseTypesLoading } = useGetLenseTypes();
  const {
    leftLens,
    rightLens,
    leftFilterLoading,
    rightFilterLoading,
    handleLeftLensFilter,
    handleRightLensFilter,
  } = useLensFilter();
  const [lensState, dispatchLens] = useReducer(
    lensefilterReducer,
    lensFilterinitialState
  );
  const handleLeftLensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatchLens({
      type: "updateleft",
      payload: { [name]: value === "" ? null : value },
    });
  };
  const handleRightLensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatchLens({
      type: "updateright",
      payload: { [name]: value === "" ? null : value },
    });
  };
  useEffect(() => {
    if (refractionDetail) {
      dispatchLens({
        type: "updateleft",
        payload: {
          left_sph: refractionDetail.left_eye_dist_sph || null,
          left_cyl: refractionDetail.left_eye_dist_cyl || null,
          left_add: refractionDetail.left_eye_near_sph || null,
        },
      });
      dispatchLens({
        type: "updateright",
        payload: {
          right_sph: refractionDetail.right_eye_dist_sph || null,
          right_cyl: refractionDetail.right_eye_dist_cyl || null,
          right_add: refractionDetail.right_eye_near_sph || null,
        },
      });
    }
  }, [refractionDetail]);
  const handleLeftLensSearch = async () => {
    if (lensState.lens_type && lensState.coating && lensState.brand) {
      const params: Record<string, string | number | null> = {};
      const { left_sph, left_cyl, left_add } = lensState.leftLens;
      params.brand_id = lensState.brand;
      params.type_id = lensState.lens_type;
      params.coating_id = lensState.coating;
      if (left_sph !== null) params.sph = parseFloat(left_sph);
      if (left_cyl !== null) params.cyl = parseFloat(left_cyl);
      if (left_add !== null) params.add = parseFloat(left_add);
      params.branch_id = getUserCurentBranch()?.id || null;
      if (lensState.lens_type === 2) {
        params.side = "left";
      } else {
        params.side = null;
      }

      try {
        dispatchLens({
          type: "reset_left_price",
        });
        dispatchLens({
          type: "reset_left_qty",
        });
        const response = await handleLeftLensFilter(params);
        console.log(response);

        dispatchLens({
          type: "update_left_price",
          payload: response.data.price,
        });
        dispatchLens({
          type: "update_left_qty",
          payload: response.data?.stock[0]?.qty,
        });
        toast.success("Lens sujestion Found check the powers");
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };
  const handleRightLensSearch = async () => {
    if (lensState.lens_type && lensState.coating && lensState.brand) {
      const params: Record<string, string | number | null> = {};
      const { right_sph, right_cyl, right_add } = lensState.rightLens;
      params.brand_id = lensState.brand;
      params.type_id = lensState.lens_type;
      params.coating_id = lensState.coating;
      if (right_sph !== null) params.sph = parseFloat(right_sph);
      if (right_cyl !== null) params.cyl = parseFloat(right_cyl);
      if (right_add !== null) params.add = parseFloat(right_add);
      params.branch_id = getUserCurentBranch()?.id || null;
      if (lensState.lens_type === 2) {
        params.side = "right";
      } else {
        params.side = null;
      }

      try {
        dispatchLens({
          type: "reset_right_price",
        });
        dispatchLens({
          type: "reset_right_qty",
        });
        const response = await handleRightLensFilter(params);

        dispatchLens({
          type: "update_right_price",
          payload: response.data.price,
        });
        dispatchLens({
          type: "update_right_qty",
          payload: response.data?.stock[0]?.qty,
        });
        toast.success("Lens sujestion Found check the powers");
      } catch (error) {
        extractErrorMessage(error);
      }
    }
  };

  const handleLeftLenseAddToCart = async () => {
    if (leftLens) {
      dispatch(
        setLense({
          ...leftLens,
          price: lensState.leftLens.left_price,
          buyQty: 1,
          lenseSide: "left",
        } as LenseWithQty)
      );
    }
  };
  const handleRightLenseAddToCart = async () => {
    if (rightLens) {
      dispatch(
        setLense({
          ...rightLens,
          price: lensState.rightLens.right_price,
          buyQty: 1,
          lenseSide: "right",
        } as LenseWithQty)
      );
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            width: 300,
          }}
        >
          <DropdownInput
            options={brands}
            onChange={(selectedId) =>
              dispatchLens({ type: "update_brand", payload: selectedId })
            }
            loading={brandsLoading}
            labelName="Select Factory"
            defaultId={null}
          />

          <DropdownInput
            options={lenseTypes}
            onChange={(selectedId) =>
              dispatchLens({ type: "update_type", payload: selectedId })
            }
            loading={lenseTypesLoading}
            labelName="Select Lens Type"
            defaultId={null}
          />
          <DropdownInput
            options={coatings}
            onChange={(selectedId) =>
              dispatchLens({ type: "update_coating", payload: selectedId })
            }
            loading={coatingsLoading}
            labelName="Select Coating"
            defaultId={null}
          />
        </Box>

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LensFilterPowers
              side="left"
              sph={lensState.leftLens.left_sph}
              cyl={lensState.leftLens.left_cyl}
              add={lensState.leftLens.left_add}
              nameSph="left_sph"
              nameCyl="left_cyl"
              nameAdd="left_add"
              handleLensInputChange={handleLeftLensChange}
              namePrice="left_price"
              price={lensState.leftLens.left_price}
            />
            <Typography variant="body2">
              Quantity : {lensState.leftQty || "N/A"}
            </Typography>
            <IconButton onClick={handleLeftLensSearch}>
              <Search />
            </IconButton>
            <Button onClick={handleLeftLenseAddToCart} variant="contained">
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LensFilterPowers
              side="right"
              sph={lensState.rightLens.right_sph}
              cyl={lensState.rightLens.right_cyl}
              add={lensState.rightLens.right_add}
              nameSph="right_sph"
              nameCyl="right_cyl"
              nameAdd="right_add"
              handleLensInputChange={handleRightLensChange}
              namePrice="right_price"
              price={lensState.rightLens.right_price}
            />
            <Typography variant="body2">
              Quantity :{lensState.rightQty || "N/A"}
            </Typography>
            <IconButton onClick={handleRightLensSearch}>
              <Search />
            </IconButton>
            <Button onClick={handleRightLenseAddToCart} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column" }}>
        {Object.values(selectedLenseList).length !== 0 &&
          Object.values(selectedLenseList).map((lenseitem) => (
            <div>
              <InvoiceLenseItem lense={lenseitem} />
            </div>
          ))}
      </Box>
    </div>
  );
}
interface RefractionDetailsProps {
  refractionDetail: RefractionDetailModel | null;
}
