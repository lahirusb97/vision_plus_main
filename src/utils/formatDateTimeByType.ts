import dayjs from "dayjs";

export const formatDateTimeByType = (
  isoString?: string | null | undefined,
  type: "date" | "time" | "both" = "both"
): string => {
  const fallback = {
    date: "N/A",
    time: "N/A",
    both: "N/A - N/A",
  };

  if (!isoString || typeof isoString !== "string") {
    return fallback[type];
  }

  const date = dayjs(isoString);
  if (!date.isValid()) {
    return fallback[type];
  }

  const formattedDate = date.format("YYYY/MM/DD");
  const formattedTime = date.format("hh.mm A");

  switch (type) {
    case "date":
      return formattedDate;
    case "time":
      return formattedTime;
    case "both":
    default:
      return `${formattedDate} - ${formattedTime}`;
  }
};
