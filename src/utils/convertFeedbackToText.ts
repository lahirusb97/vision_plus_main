export const convertFeedbackToText = (feedback: number) => {
  switch (feedback) {
    case 1:
      return "Poor";
    case 2:
      return "Average";
    case 3:
      return "Good";
    case 4:
      return "Excellent";
    default:
      return "N/A";
  }
};
