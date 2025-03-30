import { createContext, ReactNode, useContext, useState } from "react";
import { useParams } from "react-router";
import useGetSingleRefractionNumber from "../hooks/useGetSingleRefractionNumber";
import useGetRefractionDetails from "../hooks/useGetRefractionDetails";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import { RefractionNumberFormModel } from "../validations/schemaRefractionNumber";
import { RefractionNumberModel } from "../model/RefractionModel";
import { Invoice } from "../model/SingleInvoiceModel";
import useGetSingleInvoiceDetail from "../hooks/useGetSingleInvoiceDetail";
interface FactoryOrderContext {
  refractionDetail: RefractionDetailModel | null;
  invoiceDetail: Invoice | null;
  invoiceDetailLoading: boolean;
  refractionDetailLoading: boolean;
  invoiceDetailError: boolean;
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
});

export function FactoryOrderUpdateProvider({
  children,
}: FactoryOrderProviderProps) {
  const { id } = useParams();
  const { invoiceDetail, invoiceDetailLoading, invoiceDetailError } =
    useGetSingleInvoiceDetail(parseInt(id ?? ""));

  const refractionDetail = invoiceDetail?.refraction_details;

  return (
    <FactoryOrderUpdateContext.Provider
      value={{
        refractionDetail,
        invoiceDetail,
        invoiceDetailLoading,
        refractionDetailLoading: invoiceDetailLoading,
        invoiceDetailError,
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
