// TODO extract to ui/audit/LogValue.tsx
import { Box, Tooltip } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

/** Boolean flags that should render with a checkbox icon */
const BOOLEAN_FLAGS = new Set(["on_hold", "fitting_on_collection", "urgent"]);

export interface LogValueProps {
  fieldName: string; // Normalised field name from the API
  rawValue: unknown; // Raw value: string | number | boolean | null
}

export default function LogValue({ fieldName, rawValue }: LogValueProps) {
  /* ---------------------------------------------------------------------- */
  /* Normalise – guard against "true", "1", "False", etc.                   */
  /* ---------------------------------------------------------------------- */
  const boolValue =
    typeof rawValue === "boolean"
      ? rawValue
      : /^(true|1|yes)$/i.test(String(rawValue));

  const isBoolean = BOOLEAN_FLAGS.has(fieldName);

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */
  if (isBoolean) {
    const label = boolValue ? "Marked" : "Removed"; // Tooltip only

    return (
      <Tooltip title={label} arrow>
        <Box
          component="span"
          sx={{ display: "inline-flex", alignItems: "center" }}
          aria-label={label} // ✅ accessibility
        >
          {boolValue ? (
            <CheckBoxIcon fontSize="small" color="success" />
          ) : (
            <CheckBoxOutlineBlankIcon fontSize="small" color="disabled" />
          )}
        </Box>
      </Tooltip>
    );
  }

  /* Non-boolean fallback */
  return (
    <Tooltip title={String(rawValue ?? "—")} arrow>
      <Box component="span" sx={{ fontWeight: 700 }}>
        {String(rawValue ?? "—")}
      </Box>
    </Tooltip>
  );
}
