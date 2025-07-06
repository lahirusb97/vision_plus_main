import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import AutocompleteInputField from "../../../components/inputui/DropdownInput";
import useGetBranches from "../../../hooks/useGetBranches";
import { getUserCurentBranch } from "../../../utils/authDataConver";
import toast from "react-hot-toast";
import { useAxiosPost } from "../../../hooks/useAxiosPost";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";

type ActionType = "add" | "remove" | "transfer" | null;

interface StoreQtyActionDialogProps {
  open: boolean;
  onClose: () => void;
  actionType: ActionType;
  selectedItems: any[];
  quantities: { [key: number]: number | undefined };
  onConfirm: (
    data: { itemId: number; qty: number }[],
    action: ActionType
  ) => void;
}

const StoreQtyActionDialog = ({
  open,
  onClose,
  actionType,
  selectedItems = [],
  quantities = {},
  onConfirm,
}: StoreQtyActionDialogProps) => {
  const [qtyValues, setQtyValues] = useState<{ [key: number]: number }>({});
  const { branches, branchesLoading } = useGetBranches();
  const [branchId, setBranchId] = useState<number | null>(null);
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();
  const [result, setResult] = useState<Array<{ id: string; qty: number }>>([]);

  useEffect(() => {
    const newResult = Object.entries(quantities).map(([key, value]) => ({
      id: key,
      qty: qtyValues[parseInt(key)] ?? value ?? 0,
    }));
    setResult(newResult);
  }, [qtyValues, quantities]);

  const handleQtyChange = (id: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setQtyValues((prev) => ({
      ...prev,
      [id]: Math.max(0, numValue),
    }));
  };

  const handleSubmit = async () => {
    if (actionType === "transfer" && !branchId) {
      toast.error("Please select a branch");
      return;
    }
    try {
      if (actionType === "transfer") {
        const data = result.map((item: { id: string; qty: number }) => ({
          action: "transfer",
          lens_id: item.id,
          from_branch_id: parseInt(getUserCurentBranch()?.id),
          to_branch_id: branchId,
          quantity: item.qty,
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
      } else if (actionType === "add") {
        const data = result.map((item: { id: string; qty: number }) => ({
          action: "add",
          lens_id: parseInt(item.id),
          to_branch_id: parseInt(getUserCurentBranch()?.id),
          quantity: item.qty,
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
      } else if (actionType === "remove") {
        const data = result.map((item: { id: string; qty: number }) => ({
          action: "remove",
          lens_id: parseInt(item.id),
          from_branch_id: parseInt(getUserCurentBranch()?.id),
          quantity: item.qty,
        }));
        await postHandler("lenses/transfer/", { operations: data });
        //   onConfirm(data, actionType);
        onClose();
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
          {result.length} item selected
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
        {actionType === "add" ||
          (actionType === "remove" && (
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {getTitle()} from {getUserCurentBranch()?.branch_name}
            </Typography>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreQtyActionDialog;
