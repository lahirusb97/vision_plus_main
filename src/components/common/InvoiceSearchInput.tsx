import React, { useState, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { getBranchName } from "../../utils/branchName";

interface InvoiceSearchInputProps {
  searchFn: (searchText: string) => void;
  placeholder?: string;
}

const InvoiceSearchInput: React.FC<InvoiceSearchInputProps> = ({
  searchFn,
  placeholder = "Search invoices...",
}) => {
  const [searchText, setSearchText] = useState<string>(`${getBranchName()}`);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    setIsLoading(true);
    try {
      await searchFn(searchText);
    } catch (error) {
      extractErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <TextField
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        size="small"
        variant="outlined"
        disabled={isLoading}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={isLoading || !searchText.trim()}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
};

export default InvoiceSearchInput;
