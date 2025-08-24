import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Person } from "@mui/icons-material";
import OnTypeSearchInput from "../../components/inputui/OnTypeSearchInput";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
// import { useDeleteDialog } from "../../context/DeleteDialogContext";
import BadgeIcon from "@mui/icons-material/Badge";
interface PatientSearchOnTypeProps {
  onSearch: ({
    name,
    nic,
    mobile,
  }: {
    name: string | null;
    nic: string | null;
    mobile: string | null;
  }) => void;
  createPatientBtnLable: string;
  onCreatePatientClick: ({
    searchName,
    searchNic,
    searchMobile,
  }: {
    searchName: string;
    searchNic: string;
    searchMobile: string;
  }) => void;
}
export default function PatientSearchOnType({
  onSearch,
  createPatientBtnLable,
  onCreatePatientClick,
}: PatientSearchOnTypeProps) {
  const [searchName, setSearchName] = useState("");
  const [searchNic, setSearchNic] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  return (
    <Box>
      <form
        style={{
          display: "flex",
          gap: "10px",
          marginBlock: 1,
          alignItems: "baseline",
        }}
      >
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            onSearch({
              name: searchTerm,
              nic: null,
              mobile: null,
            });
          }}
          onChange={setSearchName}
          label="Name"
          value={searchName}
          required
          startIcon={<Person />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            onSearch({
              name: null,
              nic: searchTerm,
              mobile: null,
            });
          }}
          onChange={setSearchNic}
          label="NIC"
          value={searchNic}
          required
          startIcon={<BadgeIcon />}
        />
        <OnTypeSearchInput
          onSearch={(searchTerm) => {
            onSearch({
              name: null,
              nic: null,
              mobile: searchTerm,
            });
          }}
          onChange={setSearchMobile}
          label="Mobile Number"
          value={searchMobile}
          required
          startIcon={<LocalPhoneIcon />}
        />
        {/* <Button size="small" type="submit" variant="contained">
          Search
        </Button> */}
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setSearchName("");
            setSearchNic("");
            setSearchMobile("");
            onSearch({
              name: null,
              nic: null,
              mobile: null,
            });
          }}
        >
          Reset
        </Button>
      </form>
      <Button
        size="small"
        fullWidth
        onClick={() => {
          onCreatePatientClick({ searchName, searchNic, searchMobile });
        }}
        variant="outlined"
      >
        {createPatientBtnLable}
      </Button>
    </Box>
  );
}
