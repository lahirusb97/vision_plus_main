import React, { useState } from "react";
import DoctorArival from "./DoctorArival";
import DoctorAbsent from "./DoctorAbsent";
import HighlightedDatePicker from "../../../components/HighlightedDatePicker";

export default function DoctorSheduleIndex() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log("Selected Date:", selectedDate);

  return (
    <div>
      <DoctorArival />
      <DoctorAbsent />
      <HighlightedDatePicker
        doctorId={1} // Replace with actual doctor ID
        selectedDate={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
        label="Appointment Date"
      />
    </div>
  );
}
