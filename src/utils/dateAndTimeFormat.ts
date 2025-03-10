import dayjs from "dayjs";

export const dateAndTimeFormat = (isoString?: string | null) => {
  if (!isoString) return "Date: N/A    Time: N/A"; // Handle null/undefined cases

  const date = dayjs(isoString);
  return `Date: ${date.format("YYYY/MM/DD")}    Time: ${date.format(
    "hh.mm A"
  )}`;
};
