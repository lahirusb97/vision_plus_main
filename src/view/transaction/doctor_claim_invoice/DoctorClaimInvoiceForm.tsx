import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Paper } from "@mui/material";
import {
  schemaDoctorClaimInvoice,
  DoctorClaimInvoiceFormModel,
} from "../../../validations/schemaDoctorClaimInvoice";
import NormalPatientDetail from "../normal_order/NormalPatientDetail";
import TitleText from "../../../components/TitleText";

export default function DoctorClaimInvoiceForm() {
  const methods = useForm<DoctorClaimInvoiceFormModel>({
    resolver: zodResolver(schemaDoctorClaimInvoice),
    defaultValues: {
      payment: 0,
      name: "",
      phone_number: "",
      address: "",
      nic: "",
      dob: "",
      discount: 0,
    },
  });
  const handleInvoiceSubmite = (data: DoctorClaimInvoiceFormModel) => {
    console.log(data);
  };
  return (
    <Paper sx={{ padding: 2 }}>
      <TitleText title="Doctor Claim Invoice Form" />
      <FormProvider {...methods}>
        <Paper>
          <form onSubmit={methods.handleSubmit(handleInvoiceSubmite)}>
            <NormalPatientDetail />
          </form>
        </Paper>
      </FormProvider>
    </Paper>
  );
}
