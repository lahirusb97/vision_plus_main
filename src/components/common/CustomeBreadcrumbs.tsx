import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router";

const skipSegments = [
  "edit",
  "update",
  "full_edit",
  "view",
  "invoice",
  "refraction",
  "create",
]; // Add other words to skip

const segmentLabelMap: Record<string, string> = {
  stock: "Stock",
  frame_store: "Frame Store",
  // ... more mappings
};
function normalizeHref(path: string) {
  // Ensure only one leading slash, and remove any trailing slash except for root
  if (!path) return "/";
  let p = path.startsWith("/") ? path : "/" + path;
  // Remove double slashes
  p = p.replace(/\/{2,}/g, "/");
  // Optionally, remove trailing slash except root
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

function toTitleCase(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function isIdSegment(segment: string) {
  return /^\d+$/.test(segment) || /^[a-f0-9-]{24,}$/.test(segment);
}

const CustomeBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Split and filter, then filter out segments to skip
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const filteredSegments = pathSegments.filter(
    (segment) => !skipSegments.includes(segment)
  );

  const breadcrumbItems = filteredSegments.map((segment, idx) => {
    // Build base path
    let path = "/" + filteredSegments.slice(0, idx + 1).join("/");

    // Add trailing slash if not last item and not root
    if (idx < filteredSegments.length - 1 && path !== "/") {
      path = path.endsWith("/") ? path : path + "/";
    }

    let label = segmentLabelMap[segment] || toTitleCase(segment);
    if (isIdSegment(segment) && idx > 0) label = segment;

    return {
      label,
      path: idx === filteredSegments.length - 1 ? undefined : path,
    };
  });

  const items = [
    { label: "", path: filteredSegments.length > 0 ? "/" : undefined },
    ...breadcrumbItems,
  ];

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
      {items.map((item, i) =>
        item.path ? (
          <Link
            underline="hover"
            color="inherit"
            key={item.path + i}
            onClick={(e) => {
              e.preventDefault();
              navigate(item.path!);
            }}
            href={normalizeHref(item.path)}
            sx={{ cursor: "pointer" }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography color="text.primary" key={item.label + i}>
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default CustomeBreadcrumbs;
