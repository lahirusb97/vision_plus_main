import FactoryInvoiceForm from "./FactoryInvoiceForm";
import { FactoryOrderProvider } from "../../../context/FactoryOrderContext";

export default function FactoryOrder() {
  return (
    <FactoryOrderProvider>
      <FactoryInvoiceForm />
    </FactoryOrderProvider>
  );
}
