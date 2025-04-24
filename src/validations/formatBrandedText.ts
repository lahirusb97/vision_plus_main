export const formatBrandedText = (text: string) => {
  switch (text) {
    case "non_branded":
      return "non - Branded";
    case "branded":
      return "Branded";
    default:
      return "";
  }
};
