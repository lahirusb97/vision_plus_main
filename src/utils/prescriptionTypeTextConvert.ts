import { TypePrescription } from "../model/RefractionDetailModel";

export const prescriptionTypeTextConvert = (
  prescriptionType: TypePrescription
) => {
  if (prescriptionType === "internal") {
    return "Internal Prescription";
  } else if (prescriptionType === "vision_plus") {
    return "Vision Plus Prescription";
  } else if (prescriptionType === "other") {
    return "Other Prescription";
  } else {
    return "";
  }
};
