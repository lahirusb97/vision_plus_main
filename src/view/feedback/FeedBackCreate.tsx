import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Box, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import DataLoadingError from "../../components/common/DataLoadingError";
import FeedbackForm from "./FeedbackForm";
import axiosClient from "../../axiosClient";
import { FeedbackModel } from "../../model/FeedbackModel";
interface FeedBackCreateData {
  feedback: FeedbackModel | null;
  order_id: number;
  feedback_status: boolean;
}
export default function FeedBackCreate() {
  const { invoice_number } = useParams();
  const [feedbackLoading, setFeedbackLoading] = React.useState(false);
  const [feedbackData, setFeedbackData] =
    React.useState<FeedBackCreateData | null>(null);

  const [feedbackError, setFeedbackError] = React.useState(false);
  const invoiceData = async () => {
    if (!invoice_number) return;
    setFeedbackData(null);
    setFeedbackLoading(true);
    try {
      const response = await axiosClient.get(
        `order-feedback/by-invoice/?invoice_number=${invoice_number}`
      );
      setFeedbackData(response.data);
    } catch (error) {
      setFeedbackError(true);
    } finally {
      setFeedbackLoading(false);
    }
  };
  useEffect(() => {
    invoiceData();
  }, [invoice_number]);

  if (feedbackLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (feedbackError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <DataLoadingError />
      </Box>
    );
  }

  return (
    <div>
      {feedbackData && (
        <Box>
          {!feedbackData.feedback_status && (
            <FeedbackForm
              order_id={feedbackData.order_id}
              onSuccess={() => invoiceData()}
            />
          )}
          {feedbackData.feedback_status && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 8,
                p: 4,
                borderRadius: 3,
                backgroundColor: "#f0f4ff",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" color="primary" sx={{ fontWeight: 500 }}>
                Thank you for your feedback!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}
