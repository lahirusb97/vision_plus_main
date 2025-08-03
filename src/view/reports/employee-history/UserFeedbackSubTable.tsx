import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import useGetUserFeedbackHistory from "../../../hooks/report/useGetUserFeedbackHistory";
import { convertFeedbackToText } from "../../../utils/convertFeedbackToText";
import { formatDateTimeByType } from "../../../utils/formatDateTimeByType";

interface UserFeedbackSubTableProps {
  userId: number;
  startDate: string;
  endDate: string;
}

const UserFeedbackSubTable: React.FC<UserFeedbackSubTableProps> = ({
  userId,
  startDate,
  endDate,
}) => {
  const {
    userFeedbackHistoryList,
    userFeedbackHistoryListLoading,
    userFeedbackHistoryListRefresh,
    userFeedbackHistoryListError,
  } = useGetUserFeedbackHistory();
  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      userFeedbackHistoryListRefresh({
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
      });
    };

    if (userId && startDate && endDate) {
      fetchFeedbacks();
    }
  }, [userId, startDate, endDate]);

  if (userFeedbackHistoryListLoading) {
    return (
      <Box p={2} display="flex" justifyContent="center">
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (userFeedbackHistoryListError) {
    return (
      <Box p={2}>
        <Alert severity="error">
          Failed to load feedbacks. Please try again.
        </Alert>
      </Box>
    );
  }

  if (userFeedbackHistoryList.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          No feedback found for this period.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="subtitle2" gutterBottom>
        Feedback History
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Feedback Date</TableCell>
              <TableCell>Invoice #</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userFeedbackHistoryList.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>
                  {formatDateTimeByType(feedback.created_at)}
                </TableCell>
                <TableCell>{feedback.invoice_number || "N/A"}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      feedback.rating === 1
                        ? "error"
                        : feedback.rating === 2
                        ? "warning.main"
                        : feedback.rating === 3
                        ? "info.main"
                        : "success.main"
                    }
                    fontWeight="medium"
                  >
                    {convertFeedbackToText(feedback.rating)}
                  </Typography>
                </TableCell>
                <TableCell>{feedback.comment || "No comments"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserFeedbackSubTable;
