import React, { useState, useEffect } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  FormGroup,
  FormControl,
  Switch,
  Stack,
  TextField,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import { useParams } from "react-router";
import axiosClient from "../../axiosClient";
import { useAxiosPost } from "../../hooks/useAxiosPost";
import toast from "react-hot-toast";

// Inject Sinhala font face dynamically
const fontFace = `
  @font-face {
    font-family: 'FM Abhaya';
    src: url('/fonts/FMAbhaya.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0D80-0DFF;
  }
`;
const styleElement = document.createElement("style");
styleElement.appendChild(document.createTextNode(fontFace));
document.head.appendChild(styleElement);

// Multilingual content
const content = {
  en: {
    title: "To give you a better service in future,",
    title2: "How would you rate your experience in our store?",
    invoiceLabel: "Invoice #",
    options: [
      { value: 4, label: "Excellent" },
      { value: 3, label: "Good" },
      { value: 2, label: "Average" },
      { value: 1, label: "Poor" },
    ],
  },
  si: {
    title: "අනාගතයේදී ඔබට වඩා හොඳ සේවාවක් ලබා දීම සඳහා,",
    title2: "අපගේ ආයතනයේ ඔබේ අත්දැකීම හැඳින්වීමට ඔබ කැමතිද?",
    invoiceLabel: "ඉන්වොයිස් අංකය #",
    options: [
      { value: 4, label: "විශිෂ්ටයි" },
      { value: 3, label: "හොඳයි" },
      { value: 2, label: "සාමාන්‍යයි" },
      { value: 1, label: "නරකයි" },
    ],
  },
};

interface FeedbackFormProps {
  order_id: number;
  onSuccess?: () => void; // Add onSuccess callback prop
}

export default function FeedbackForm({
  order_id,
  onSuccess,
}: FeedbackFormProps) {
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { invoice_number } = useParams();
  const { postHandler, postHandlerError, postHandlerloading } = useAxiosPost();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(event.target.checked ? "si" : "en");
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const feedbackSubmit = async () => {
    if (!rating) {
      toast.error(
        language === "si" ? "කරුණාකර ඇගයීමක් තෝරන්න" : "Please select a rating"
      );
      return;
    }
    setIsSubmitting(true);
    try {
      postHandler("order-feedback/", {
        order: order_id,
        rating,
        comment: comment.trim() || null,
      });

      toast.success("Feedback submitted successfully!");

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        language === "si"
          ? "දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න."
          : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        borderRadius: 3,
        backgroundColor: "#ffffff",
      }}
    >
      <Stack spacing={4}>
        {/* Language and Invoice Number */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {order_id && (
            <Chip
              label={`${content[language].invoiceLabel}${invoice_number}`}
              color="primary"
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontWeight: "bold",
                px: 1.5,
                py: 1,
              }}
            />
          )}
          <FormControlLabel
            control={
              <Switch
                checked={language === "si"}
                onChange={handleLanguageChange}
                inputProps={{ "aria-label": "language-switch" }}
                color="primary"
              />
            }
            label={language === "si" ? "සිංහල" : "English"}
            labelPlacement="start"
            sx={{ m: 0 }}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          component="h1"
          textAlign="center"
          color="primary"
        >
          {content[language].title}
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          textAlign="center"
          color="primary"
        >
          {content[language].title2}
        </Typography>

        {/* Rating Options */}
        <RadioGroup
          name="rating-radio-buttons-group"
          value={rating ?? ""}
          onChange={handleRatingChange}
        >
          {content.en.options.map((option, index) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontFamily:
                      language === "si" ? "'FM Abhaya', sans-serif" : undefined,
                    fontSize: language === "si" ? "1.2rem" : "1rem",
                  }}
                >
                  {content[language].options[index].label}
                </Typography>
              }
              sx={{
                pl: 1,
                "& .MuiRadio-root": {
                  color: "#1976d2",
                },
                "&:hover": {
                  backgroundColor: "#f0f4ff",
                  borderRadius: 1,
                },
              }}
            />
          ))}
        </RadioGroup>

        {/* Feedback TextArea */}
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          label={language === "si" ? "ඔබගේ අදහස්" : "Your feedback"}
          placeholder={
            language === "si"
              ? "ඔබගේ අදහස් මෙතැන ලියන්න..."
              : "Type your feedback here..."
          }
        />

        <Button
          onClick={feedbackSubmit}
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          sx={{
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          {isSubmitting
            ? language === "si"
              ? "යොමු කරමින්..."
              : "Submitting..."
            : language === "si"
            ? "යොමු කරන්න"
            : "Submit"}
        </Button>
      </Stack>
    </Paper>
  );
}
