import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetBranches from "../../../hooks/useGetBranches";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import toast from "react-hot-toast";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { LenseModelWithQuantity } from "./inventory-LenseStore";
import InfoChip from "../../../components/common/InfoChip";
import returnPlusSymbol from "../../../utils/returnPlusSymbol";

type ActionType = "add" | "remove" | "transfer" | null;

interface StoreQtyActionDialogProps {
  open: boolean;
  onClose: () => void;
  actionType: ActionType;
  quantities: LenseModelWithQuantity[];
  refresh: () => void;
}

const StoreQtyActionDialog = ({
  open,
  onClose,
  actionType,
  quantities,
  refresh,
}: StoreQtyActionDialogProps) => {
  const { branches, branchesLoading } = useGetBranches();
  const [branchId, setBranchId] = useState<number | null>(null);
  const { postHandler, postHandlerloading } = useAxiosPost();

  const handleSubmit = async () => {
    if (actionType === "transfer" && !branchId) {
      toast.error("Please select a branch");
      return;
    }
    try {
      if (actionType === "transfer") {
        const data = quantities.map((item: LenseModelWithQuantity) => ({
          action: "transfer",
          lens_id: item.id,
          from_branch_id: getUserCurentBranch()?.id,
          to_branch_id: branchId,
          quantity: parseInt(item.selectedQuantity),
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
        refresh();
      } else if (actionType === "add") {
        const data = quantities.map((item: LenseModelWithQuantity) => ({
          action: "add",
          lens_id: item.id,
          to_branch_id: getUserCurentBranch()?.id,
          quantity: parseInt(item.selectedQuantity),
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
        refresh();
      } else if (actionType === "remove") {
        const data = quantities.map((item: LenseModelWithQuantity) => ({
          action: "remove",
          lens_id: item.id,
          from_branch_id: getUserCurentBranch()?.id,
          quantity: parseInt(item.selectedQuantity),
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
        refresh();
      }
    } catch (error) {
      extractErrorMessage(error);
    }
  };

  const getTitle = () => {
    switch (actionType) {
      case "add":
        return "Add Quantity";
      case "remove":
        return "Remove Quantity";
      case "transfer":
        return "Transfer Quantity";
      default:
        return "Quantity Action";
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {quantities.length} item selected
        </Typography>
        {actionType === "transfer" && (
          <AutocompleteInputField
            options={
              branches
                ?.filter((branch) =>
                  actionType === "transfer"
                    ? branch.id !== getUserCurentBranch()?.id
                    : true
                )
                .map((branch) => ({
                  id: branch.id,
                  name: branch.branch_name,
                })) ?? []
            }
            loading={branchesLoading}
            labelName="Branch"
            defaultId={branchId}
            onChange={(id) => setBranchId(id)}
          />
        )}
        {/*display lens details */}
        {quantities.map((item: LenseModelWithQuantity) => (
          <Box
            key={item.id}
            sx={{
              my: 1.5,
              p: 2,
              borderRadius: 2,
              backgroundColor:
                actionType === "add"
                  ? "#E8F5E9"
                  : actionType === "remove"
                  ? "#FFEBEE"
                  : actionType === "transfer"
                  ? "#E3F2FD"
                  : "#f5f5f5",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">
              {item.brand_name} — {item.type_name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {item.coating_name}
            </Typography>
            <Typography variant="body2">
              <strong>Quantity:</strong> {item.selectedQuantity}
            </Typography>
            <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
              {item.powers.map((item) => (
                <div key={item.power_name}>
                  <InfoChip
                    label={item.power_name}
                    value={`${returnPlusSymbol(item.value)}${parseFloat(
                      item.value
                    ).toFixed(2)}`}
                  />
                </div>
              ))}
            </Stack>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={postHandlerloading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={postHandlerloading}
          variant="contained"
          color="primary"
        >
          {postHandlerloading ? "Loading..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreQtyActionDialog;
