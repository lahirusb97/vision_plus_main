import { createContext, ReactNode, useContext } from "react";
import { useLocation } from "react-router";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import { Invoice } from "../model/SingleInvoiceModel";
import useGetSingleInvoice from "../hooks/useGetSingleInvoice";
interface FactoryOrderContext {
  refractionDetail: RefractionDetailModel | null;
  invoiceDetail: Invoice | null;
  invoiceDetailLoading: boolean;
  refractionDetailLoading: boolean;
  invoiceDetailError: boolean;
  invoiceListRefresh: () => void;
}
interface FactoryOrderProviderProps {
  children: ReactNode;
}
const FactoryOrderUpdateContext = createContext<FactoryOrderContext>({
  refractionDetail: null,
  invoiceDetail: null,
  invoiceDetailLoading: false,
  refractionDetailLoading: false,
  invoiceDetailError: false,
  invoiceListRefresh: () => {},
});

export function FactoryOrderUpdateProvider({
  children,
}: FactoryOrderProviderProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const {
    invoiceData: invoiceDetail,
    invoiceLoading: invoiceDetailLoading,
    invoiceError: invoiceDetailError,
    invoiceListRefresh,
  } = useGetSingleInvoice(queryParams.get("invoice_number") || "", "factory");

  const refractionDetail = invoiceDetail?.refraction_details ?? null;

  return (
    <FactoryOrderUpdateContext.Provider
      value={{
        refractionDetail,
        invoiceDetail,
        invoiceDetailLoading,
        refractionDetailLoading: invoiceDetailLoading,
        invoiceDetailError,
        invoiceListRefresh,
      }}
    >
      {children}
    </FactoryOrderUpdateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFactoryOrderUpdateContext() {
  const context = useContext(FactoryOrderUpdateContext);
  if (!context) {
    throw new Error(
      "useFactoryOrderContext must be used within a FactoryOrderProvider"
    );
  }
  return context;
}
